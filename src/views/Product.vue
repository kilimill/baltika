<template lang="pug">
	section.product
		img(src="@/assets/img/players.png", data-movekoef='9').product__players.js-tweenelem
		p.product__title.js-tweenelem(data-movekoef='5') Поддержи
		p.product__title.js-tweenelem(data-movekoef='6') сборную
		p.product__title.js-tweenelem(data-movekoef='7') вместе
		p.product__title.js-tweenelem(data-movekoef='8') с
			span Балтикой
		img(src="@/assets/img/b7.png", data-movekoef='13').product__b7.js-tweenelem
</template>

<script>
	import { qs } from '@/helpers/index';
	import { mapState } from "vuex";
	import { gsap } from 'gsap'

	export default {
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
		},
		mounted() {
			setTimeout(() => qs('.product').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.main').setAttribute('mobileloaded', true), 100);

			if (!this.mobile) {
				setTimeout(() => qs('body').classList.add('nodelay'), 1500);
				setTimeout(() => window.addEventListener('mousemove', this.mouseMoveHandler), 1500);
				setTimeout(() => window.addEventListener('wheel', this.scrollHandler), 1500);
			} else {
				setTimeout(() => window.addEventListener('touchstart', this.windowTouchStart, false), 400);
			}
		},
		destroyed() {
			if (!this.mobile) {
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
				qs('body').classList.remove('nodelay')
				qs('.product').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');
				qs('.main').removeAttribute('mobileloaded');

				setTimeout(() => this.$router.push({name: 'Video'}), 670);
			},

			scrollHandler(e) {
				if (Math.sign(e.deltaY) < 0 && !this.activeIsBurger) {
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
				if (Math.abs(diffX) < Math.abs(diffY)) {
					if (diffY < 0 && parseInt(window.scrollY) <= 0) {
						window.removeEventListener('touchstart', this.windowTouchStart, false);
						window.removeEventListener('touchmove', this.windowTouchEvent, false);
						this.prevPage()
					} 
				}
			},
	
			mouseMoveHandler(e) {
				const tweenElem = document.querySelectorAll('.js-tweenelem');

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
			}
		}
	}
</script>