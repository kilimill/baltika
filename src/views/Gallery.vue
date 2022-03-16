<template lang="pug">
	section.gallery
		.wrapper
			p.gallery__title Наши победители
			.gallery__items
				a(:href="item.href", target="_blank", v-for="(item, index) in gallery[page]", :class="itemSize(item.size)", :data-movekoef='index+2.5*3').gallery__item.js-tweenelem
					img(:src="item.img", v-if="item.img")
					video(autoplay, muted, playsinline, loop, v-if="item.video")
						source(:src="item.video" type="video/mp4")
					p.gallery__item-username @{{item.username}}
				//- button(type="button", @click="morePhoto()").gallery__btn Больше фото
</template>

<script>
	import { qs, scrollTo } from '@/helpers/index';
	import { mapState } from "vuex";
	import { gsap } from 'gsap'

	export default {
		computed: {
			...mapState("gallery", {
				gallery: 'gallery',
			}),
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
		},
		mounted() {
			setTimeout(() => qs('.gallery').setAttribute('loaded', true), 200);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 200);

			if (!this.mobile) {
				setTimeout(() => qs('body').classList.add('nodelay'), 2700);
				setTimeout(() => window.addEventListener('mousemove', this.mouseMoveHandler), 1500);
				setTimeout(() => window.addEventListener('wheel', this.scrollHandler), 1500);
			} else {
				setTimeout(() => window.addEventListener('touchstart', this.windowTouchStart, false), 400);
			}
		},
		destroyed() {
			if (!this.mobile) {
				qs('body').classList.remove('nodelay')
				window.removeEventListener('wheel', this.scrollHandler);
				window.removeEventListener('mousemove', this.mouseMoveHandler);
			} else {
				window.removeEventListener('touchstart', this.windowTouchStart, false);
				window.removeEventListener('touchmove', this.windowTouchEvent, false);
				window.removeEventListener('scroll', this.scrollInnerHandler);
			}
		},
		methods: {
			prevPage() {
				qs('.gallery').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Rules'}), 300);
			},
			nextPage() {
				qs('.gallery').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Video'}), 500);
			},

			scrollHandler(e) {
				if (Math.sign(e.deltaY) > 0 && !this.activeIsBurger) {
					window.removeEventListener('wheel', this.scrollHandler);
					window.removeEventListener('touchstart', this.windowTouchStart);
					this.nextPage();
				} else if (Math.sign(e.deltaY) < 0 && !this.activeIsBurger) {
					window.removeEventListener('wheel', this.scrollHandler);
					window.removeEventListener('touchstart', this.windowTouchStart);
					this.prevPage()
				}
			},

			windowTouchStart(e) {
				this.initialY = e.touches[0].clientY;
				this.initialX = e.touches[0].clientX;
				window.addEventListener('touchmove', this.windowTouchEvent, false);
			},

			windowTouchEvent(e) {
				const diffY = this.initialY - e.touches[0].clientY;
				const diffX = this.initialX - e.touches[0].clientX;
				const body = document.body,
					html = document.documentElement;
				let documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
				if (Math.abs(diffX) < Math.abs(diffY)) {
					if (diffY < 0 && parseInt(window.scrollY) <= 0) {
						window.removeEventListener('touchstart', this.windowTouchStart, false);
						window.removeEventListener('touchmove', this.windowTouchEvent, false);
						this.prevPage()
					} else if (diffY > 0 && (parseInt(window.scrollY) + window.innerHeight) + 4 >= documentHeight) {
						window.removeEventListener('touchstart', this.windowTouchStart, false);
						window.removeEventListener('touchmove', this.windowTouchEvent, false);
						this.nextPage()
					}
				}
			},

			mouseMoveHandler(e) {
				const tweenElem = document.querySelectorAll('.js-tweenelem');
				// const timeline = new TimelineLite();

				let centerX = Math.round(window.innerWidth / 2);
				let centerY = Math.round(window.innerHeight / 2);
				let diffX = (e.clientX - centerX) / centerX;
				let diffY = (e.clientY - centerY) / centerY;

				tweenElem.forEach(function (elem) {
					gsap.to(elem, 1, {
						x: Math.round((elem.dataset.movekoef * diffX)),
						y: Math.round((elem.dataset.movekoef * diffY)),
					});
				});
			},

			itemSize(size) {
				if (size == 'medium') {
					return 'gallery__item--medium'
				}
				if (size == 'small') {
					return 'gallery__item--small'
				}
				if (size == 'big') {
					return 'gallery__item--big'
				}
			},

			morePhoto() {
				qs('.gallery').classList.add('hidden');
				if (this.mobile) scrollTo(qs('.header'), 600)
				setTimeout(() => {
					if (this.page + 1 <= this.maxPage) {
						console.log(this.page + 1 <= this.maxPage)
						this.page = this.page + 1;
					} else {
						this.page = 0;
					}
					qs('.gallery').classList.remove('hidden');
				}, 800)
			}
		},
		data() {
			return {
				page: 0,
				maxPage: 2,
			}
		}
	}
</script>