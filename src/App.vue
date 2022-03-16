<template lang="pug">
	main.main(:class="page")
		.bg
			.bg__img
				img(src="@/assets/img/bg.jpg")
			.bg__blue
			.bg__red
			.bg__redtwo
			.bg__redthree
		<Header :page="page" />
		.main__content
			<transition name="fade" mode="out-in">
				<router-view :key="key"></router-view>
			</transition>
		<Footer :page="page" />
</template>

<script>
	import { mapState } from "vuex";
	import Header from './components/layout/Header';
	import Footer from './components/layout/Footer';

	import { on_load_mixin } from "./system/statistics";
	import { addClass, qs } from '@/helpers/index';

	export default {
		mixins: [
			on_load_mixin
		],
		components: {
			Header,
			Footer,
		},
		computed: {
			...mapState('common', {
				mobile: 'mobile',
			}),

			page() {
				return this.$route.name !== undefined 
					? this.$route.name : this.$route;
			},

			key() {
			return this.$route.meta.key !== undefined 
				? this.$route.meta.key : this.$route;
			}
		},

		mounted() {
			this.$root.sendGA('internal', 'click', 'skroll_intro');
			if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) addClass(qs('html'), 'ios');
			if (window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1) addClass(qs('html'), 'ie');
			this.resizeHandler();
			window.addEventListener('resize', this.resizeHandler);

			setTimeout(() => qs('.main').setAttribute('loaded', true), 100);
		},

		methods: {
			resizeHandler() {
				if (this.mobile) {
					qs('.main__content').setAttribute('style', `minheight: ${window.innerHeight - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight}px`)
				} else {
					qs('.main__content').setAttribute('style', `height: ${window.innerHeight - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight}px`)
				}
			}
		}
	};
</script>

<style lang="stylus">
.main
  pos relative
</style>
