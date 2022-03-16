<template lang="pug">
	section.rules
		p.rules__marquee
			span &nbsp;#зарядинашихнапобеду #сильнеевместе #балтика #зарядинашихнапобеду #сильнеевместе #балтика #зарядинашихнапобеду #сильнеевместе #балтика #зарядинашихнапобеду #сильнеевместе #балтика
		.rules__container
			p.rules__title Зарядим сборную 
				br(v-if="this.mobile")
				| на победу вместе!
			.rules__list
				.rules__list-item
					img(src="@/assets/img/rules-1.png").rules__list-icon.rules__list-icon--first
					p.rules__list-text Сфотографируй 
						br(v-if="!this.mobile")
						| как ты поддерживаешь команду 
						br(v-if="!this.mobile")
						| самым необычным способом
				.rules__list-item
					img(src="@/assets/img/rules-2.png").rules__list-icon.rules__list-icon--second
					p.rules__list-text Выложи в Instagram с хэштегом
						br
						| #Зарядинашихнапобеду
						br
						| #сильнеевместе #балтика
				.rules__list-item
					img(src="@/assets/img/rules-3.png").rules__list-icon.rules__list-icon--third
					p.rules__list-text Выигрывай уникальные 
						br(v-if="!this.mobile")
						| хоккейные призы
			a(href="/rules.pdf", target="_blank", @click="$root.sendGA('external', 'click', 'polnye_pravila')", v-if="this.mobile").rules__rules Полные правила участия в конкурсе
</template>

<script>
	import { qs } from '@/helpers/index';
	import { mapState } from 'vuex';

	import Icon1 from '@/assets/svg/icon-1.svg'
	import Icon2 from '@/assets/svg/icon-2.svg'
	import Icon3 from '@/assets/svg/icon-3.svg'

	export default {
		components: {
			Icon1,
			Icon2,
			Icon3
		},
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
		},
		mounted() {
			setTimeout(() => qs('.rules').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.main').setAttribute('mobileloaded', true), 100);

			if (!this.mobile) {
				setTimeout(() => window.addEventListener('wheel', this.scrollHandler), 1500);
			} else {
				setTimeout(() => window.addEventListener('touchstart', this.windowTouchStart, false), 400);
			}
		},
		destroyed() {
			if (!this.mobile) {
				window.removeEventListener('wheel', this.scrollHandler);
			} else {
				window.removeEventListener('touchstart', this.windowTouchStart, false);
				window.removeEventListener('touchmove', this.windowTouchEvent, false);
				window.removeEventListener('scroll', this.scrollInnerHandler);
			}
		},
		methods: {
			prevPage() {
				qs('.rules').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');
				qs('.main').removeAttribute('mobileloaded');

				setTimeout(() => this.$router.push({name: 'News'}), 400);
			},

			nextPage() {
				qs('.rules').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');
				qs('.main').removeAttribute('mobileloaded')

				setTimeout(() => this.$router.push({name: 'Gallery'}), 400);
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
		}
	}
</script>