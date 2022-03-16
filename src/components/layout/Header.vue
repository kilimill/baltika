<template lang="pug">
	header.header
		.wrapper
			button(v-if="page != 'Intro'", @click="calcPage(page)").header__prev Назад
			a(href="https://www.championat.com/", target="_blank", @click="$root.sendGA('external', 'click', 'logo_chempionat')").header__link
				<Logo class="header__logo" />
			<Social v-if="!this.mobile"/>
			button(type="button" @click="toggleNavburger" :class="{ 'active' : activeIsBurger }" ref="burger").header__burger
				span.header__burger-line.header__burger-line--el1
				span.header__burger-line.header__burger-line--el2
				span.header__burger-line.header__burger-line--el3
				span.header__burger-line.header__burger-line--el4
			.header__nav
				.header__nav-bg
					img(src="@/assets/img/bg.jpg")
				.header__nav-list
					a(@click="goToPage('News')", :class="{'active': this.page=='News'}").header__nav-item О сборной
					a(@click="goToPage('Rules')", :class="{'active': this.page=='Rules'}").header__nav-item О конкурсе
					a(@click="goToPage('Gallery')", :class="{'active': this.page=='Gallery'}").header__nav-item Наши победители
					a(@click="goToPage('Video')", :class="{'active': this.page=='Video'}").header__nav-item #сильнее вместе
					a(@click="goToPage('Product')", :class="{'active': this.page=='Product'}").header__nav-item О продукте
			.header__logos(v-if="this.mobile")
				.header__logos-container
					a(href="http://bezalkogolnoe.baltika7.ru/?utm_source=championat_main&utm_medium=logo", target="_blank", @click="$root.sendGA('external', 'click', 'logo_baltika')").header__logos-link
						<BaltikaLogo class="header__logos-baltika"/>
					a(href="https://fhr.ru/?utm_source=championat_main&utm_medium=logo", target="_blank", @click="$root.sendGA('external', 'click', 'logo_xokkej_rossii')").header__logos-link
						<HockeyLogo class="header__logos-hockey"/>
				p.header__logos-text Официальный партнер
					br
					| сборной России по хоккею

</template>

<script>
	const bodyScrollLock = require('body-scroll-lock');
	const disableBodyScroll = bodyScrollLock.disableBodyScroll;
	const enableBodyScroll = bodyScrollLock.enableBodyScroll;
	import { mapState } from 'vuex';
	import { qs, toggleClass } from '@/helpers/index';
	import Social from '@/components/Social'
	import Logo from '@/assets/svg/champ.svg'

	import BaltikaLogo from '@/assets/svg/baltika.svg'
	import HockeyLogo from '@/assets/svg/hockey.svg'

	export default {
		components: {
			Social,
			Logo,
			BaltikaLogo,
			HockeyLogo
		},
		props: {
			page: {
				type: String,
				required: true,
			},
		},
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger',
			}),
		},
		methods: {
			goToPage(nextpage) {
				if (this.page != nextpage) {
					if (!this.mobile) {
						toggleClass(qs('.main'), 'burgeropen');
						this.toggleNavburger();
					}
					qs(`.${this.page.toLowerCase()}`).removeAttribute('loaded');
					qs('.bg').removeAttribute('loaded');

					if (nextpage == 'News') this.$root.sendGA('internal', 'click', 'o_sbornoi');
					if (nextpage == 'Rules') this.$root.sendGA('internal', 'click', 'o_konkurse');
					if (nextpage == 'Gallery') this.$root.sendGA('internal', 'click', 'nashi_pobediteli');
					if (nextpage == 'Video') this.$root.sendGA('internal', 'click', 'translyaciya');
					if (nextpage == 'Product') this.$root.sendGA('internal', 'click', 'o_produkte');

					setTimeout(() => {
						this.$router.push({name: nextpage});
						if (this.mobile) this.toggleNavburger();
					}, 400);
				}
			},
			toggleNavburger() {
				if (!this.mobile) toggleClass(qs('.main'), 'burgeropen');
				this.$store.commit('common/SHOW_BURGER', !this.activeIsBurger)

				if (this.activeIsBurger) {
					this.$root.sendGA("internal", "click", `burger_menyu`);
				} else {
					this.$root.sendGA("internal", "click", `zakryt_burger_menyu`);
				}

				toggleClass(qs('.header'), 'transparent');
				toggleClass(qs('.header__nav'), 'active');

				if (this.mobile) {
					this.menuOpened = !this.menuOpened;
					this.menuOpened ? enableBodyScroll(qs('.header__nav')) : setTimeout(() => disableBodyScroll(qs('.header__nav')), 300);
				}
			},
			calcPage(page) {
				let nextPage = '';
				if (page == 'News') nextPage = 'Intro'
				if (page == 'Rules') nextPage = 'News'
				if (page == 'Gallery') nextPage = 'Rules'
				if (page == 'Video') nextPage = 'Gallery'
				if (page == 'Product') nextPage = 'Video'

				qs(`.${page.toLowerCase()}`).removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				this.$root.sendGA('internal', 'click', 'nazad');

				if (!this.mobile) this.$store.commit('common/SHOW_BURGER', false)

				setTimeout(() => this.$router.push({name: nextPage}), 400);
			}
		},
		data() {
			return {
				menuOpened: true,
			}
		}
	}
</script>>
