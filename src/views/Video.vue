<template lang="pug">
	section.video
		p.video__marquee
			span #сильнеевместе #сильнеевместе
		.video__frame
			iframe(src="https://www.youtube.com/embed/gLbwUjgAeqY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

</template>

<script>
	import { qs } from '@/helpers/index';
	import { mapState } from "vuex";

	export default {
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
		},
		mounted() {
			setTimeout(() => qs('.video').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 100);

			if (!this.mobile) {
				setTimeout(() => window.addEventListener('mousemove', this.mouseMoveHandler), 400);
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
				qs('.video').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Gallery'}), 600);
			},
			nextPage() {
				qs('.video').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Product'}), 600);
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