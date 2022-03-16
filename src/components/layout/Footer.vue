<template lang="pug">
	footer.footer
		.wrapper
			span.footer__spacer(v-if="this.mobile")
			.footer__left(v-if="!this.mobile")
				.footer__left-container
					.footer__container
						a(href="http://bezalkogolnoe.baltika7.ru/?utm_source=championat_main&utm_medium=logo", target="_blank", @click="$root.sendGA('external', 'click', 'logo_baltika')").footer__link
							<BaltikaLogo class="footer__baltika"/>
						a(href="https://fhr.ru/?utm_source=championat_main&utm_medium=logo", target="_blank", @click="$root.sendGA('external', 'click', 'logo_xokkej_rossii')").footer__link
							<HockeyLogo class="footer__hockey"/>
					p.footer__text Официальный партнер
						br
						| сборной России по хоккею
				<transition name="fade" mode="out-in" v-if="page == 'Rules'">
					a(href="/rules.pdf", target="_blank", @click="$root.sendGA('external', 'click', 'polnye_pravila')").footer__rules Полные правила участия в конкурсе
				</transition>
			.footer__center(v-if="page != 'Product'")
				button(@click="calcPage(page)").footer__next Скролль
					span
				</router-link>
			.footer__right
				img(src="@/assets/img/alcohol.png").footer__right-img
</template>

<script>
	import { mapState } from 'vuex';
	import { qs } from '@/helpers/index';
	import BaltikaLogo from '@/assets/svg/baltika.svg'
	import HockeyLogo from '@/assets/svg/hockey.svg'

	export default {
		components: {
			BaltikaLogo,
			HockeyLogo
		},
		computed: {
			...mapState('common', {
				mobile: 'mobile',
			}),
		},
		props: {
			page: {
				type: String,
				required: true,
			},
		},
		methods: {
			calcPage(page) {
				let nextPage = '';
				if (page == 'Intro') nextPage = 'News'
				if (page == 'News') nextPage = 'Rules'
				if (page == 'Rules') nextPage = 'Gallery'
				if (page == 'Gallery') nextPage = 'Video'
				if (page == 'Video') nextPage = 'Product'

				qs(`.${page.toLowerCase()}`).removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				this.$root.sendGA('internal', 'click', `skroll_${page.toLowerCase()}`);

				if (!this.mobile) this.$store.commit('common/SHOW_BURGER', false)

				setTimeout(() => this.$router.push({name: nextPage}), 400);
			}
		}
	}
</script>
