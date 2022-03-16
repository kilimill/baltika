<template lang="pug">
	section.intro
		.wrapper
			.intro__row.intro__row--left
				p.intro__title.intro__title--opacity.js-tweenelem(data-movekoef='3') Поддержим
			.intro__row
				p.intro__mtext(v-if="!this.mobile") Все самое важное, 
					br
					| что нужно знать
				p.intro__title.js-tweenelem(data-movekoef='4') Сборную
			.intro__row
				p.intro__title.js-tweenelem(data-movekoef='6') Вместе
				p.intro__stext.js-tweenelem(v-if="!this.mobile") Национальная команда, представляющая Россию на международных турнирах по хоккею с шайбой. Управляется Федерацией хоккея России. Впервые была собрана в 1992 году, получив право выступать в группе сильнейших на чемпионате мира как правопреемница сборной СССР.
				img(src="@/assets/img/puck.png" v-if="!this.mobile", data-movekoef='9').intro__puck.js-tweenelem
				img(src="@/assets/img/puck-mobile.png" v-if="this.mobile").intro__puck
			img(src="@/assets/img/b7.png", data-movekoef='8').intro__bottle.js-tweenelem
			.intro__mobilerow(v-if="this.mobile")
				p.intro__mtext Все самое важное, 
					br
					| что нужно знать
				p.intro__stext Национальная команда, представляющая Россию на&nbsp;международных турнирах по хоккею с шайбой. Управляется Федерацией хоккея России. Впервые была собрана в 1992 году, получив право выступать
					br(v-if="this.mobile")
					| в группе сильнейших на чемпионате мира
					br(v-if="this.mobile")
					| как правопреемница сборной СССР.
</template>

<script>
	import { mapState } from 'vuex';
	import { qs } from '@/helpers/index';
	import { gsap } from 'gsap'

	export default {
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
		},
		mounted() {
			setTimeout(() => qs('.intro').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 100);

			if (!this.mobile) {
				setTimeout(() => qs('body').classList.add('nodelay'), 800);
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
			nextPage() {
				qs('body').classList.remove('nodelay');
				qs('.intro').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');
				setTimeout(() => this.$router.push({name: 'News'}), 500);
			},

			scrollHandler(e) {
				if (Math.sign(e.deltaY) > 0 && !this.activeIsBurger) {
					window.removeEventListener('wheel', this.scrollHandler);
					window.removeEventListener('touchstart', this.windowTouchStart);
					this.nextPage();
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
					if (diffY > 0 && (parseInt(window.scrollY) + window.innerHeight) + 4 >= documentHeight) {
						window.removeEventListener('touchstart', this.windowTouchStart, false);
						window.removeEventListener('touchmove', this.windowTouchEvent, false);
						this.nextPage()
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