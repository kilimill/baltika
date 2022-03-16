<template lang="pug">
	section.news
		.wrapper
			.news__container
				.news__list
					.news__item(v-for="(item, index) in news[currentPage]")
						a(:href="item.link", target="_blank", @click="$root.sendGA('external', 'click', `novost_${currentPage}-${+index+1}_chitat`);").news__img
							img(:src="item.pic")
						span.news__date {{item.data}}
						a(:href="item.link", target="_blank", @click="$root.sendGA('external', 'click', `novost_${currentPage}-${+index+1}_chitat`);").news__link
							p.news__title(v-html="item.title")
						a(:href="item.link", target="_blank", @click="$root.sendGA('external', 'click', `novost_${currentPage}-${+index+1}_chitat`);").news__href Читать
				<transition name="fade" mode="out-in" v-if="currentPage > 1">
					button(type="button", @click="prevNews()", key="1").news__prev Предыдущие статьи
				</transition>
				<transition name="fade" mode="out-in" v-if="currentPage != totalPage">
					button(type="button", @click="nextNews()").news__more Показать еще
				</transition>
			.news__calendar(v-if="this.mobile")
				<swiper ref="mySwiper" :options="swiperOptions" class="news__calendar-slider">
					<swiper-slide class="news__calendar-item" :key="1">
						a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901779/#stats", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_finlandia_05_11');")
							p.news__calendar-data 05.11.2020 19:30 
								| | 
								b Результат 6:2
							.news__calendar-country
								span.news__calendar-rus Россия
								span.news__calendar-fin Финляндия
					</swiper-slide>
					<swiper-slide class="news__calendar-item" :key="2">
						a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901783/#preview", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_shvecia_07_11');")
							p.news__calendar-data 07.11.2020 14:30 
								| | 
								b Результат 2:1
							.news__calendar-country
								span.news__calendar-rus Россия
								span.news__calendar-sw Швеция
					</swiper-slide>
					<swiper-slide class="news__calendar-item" :key="3">
						a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901787/#preview?utm_source=championat.com&utm_medium=landing&utm_campaign=baltika&utm_content=mix&utm_term=calendar", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_chehiya_08_11');")
							p.news__calendar-data 08.11.2020 14:30 
								| | 
								b Результат 3:0
							.news__calendar-country
								span.news__calendar-rus Россия
								span.news__calendar-ch Чехия
					</swiper-slide>
					<swiper-slide class="news__calendar-item" :key="4">
						p.news__calendar-data 17.12.2020 20:00
							| | 
							b Результат 4:3
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-sw Швеция
					</swiper-slide>
					<swiper-slide class="news__calendar-item" :key="5">
						p.news__calendar-data 19.12.2020 15:00
							| | 
							b Результат 4:1
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-ch Чехия
					</swiper-slide>
					<swiper-slide class="news__calendar-item" :key="6">
						p.news__calendar-data 20.11.2020 16:00
							| | 
							b Результат 5:1
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-fin Финляндия
					</swiper-slide>
				</swiper>
				<div class="swiper-pagination">
					<span class="swiper-pagination-bullet swiper-pagination-bullet-active" @click="paginationClick(0)" role="button"></span>
					<span class="swiper-pagination-bullet" @click="paginationClick(1)" role="button"></span>
					<span class="swiper-pagination-bullet" @click="paginationClick(2)" role="button"></span>
					<span class="swiper-pagination-bullet" @click="paginationClick(3)" role="button"></span>
					<span class="swiper-pagination-bullet" @click="paginationClick(4)" role="button"></span>
					<span class="swiper-pagination-bullet" @click="paginationClick(5)" role="button"></span>
				</div>

			.news__calendar(v-if="!this.mobile")
				p.news__calendar-title Календарь событий
				a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901779/#stats", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_finlandia_05_11');").news__calendar-item
					span.news__calendar-data 05.11.2020 19:30
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-fin Финляндия
						p.news__calendar-score 6:2
				a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901783/#preview", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_shvecia_07_11');").news__calendar-item
					span.news__calendar-data 07.11.2020 14:30
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-sw Швеция
						p.news__calendar-score 2:1
				a(href="https://www.championat.com/hockey/_eurotour/tournament/4127/match/901787/#preview?utm_source=championat.com&utm_medium=landing&utm_campaign=baltika&utm_content=mix&utm_term=calendar", target="_blank", @click="$root.sendGA('external', 'click', 'rossiya_chehiya_08_11');").news__calendar-item
					span.news__calendar-data 08.11.2020 14:30
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-ch Чехия
						p.news__calendar-score 3:0
				a().news__calendar-item
					span.news__calendar-data 17.12.2020 20:00
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-sw Швеция
						p.news__calendar-score 4:3
				a().news__calendar-item
					span.news__calendar-data 19.12.2020 15:00
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-ch Чехия
						p.news__calendar-score 4:1
				a().news__calendar-item
					span.news__calendar-data 20.12.2020 16:00
					.news__calendar-container
						.news__calendar-country
							span.news__calendar-rus Россия
							span.news__calendar-fin Финляндия
						p.news__calendar-score 5:1
</template>

<script>
	import { mapState } from "vuex";
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import 'swiper/dist/css/swiper.css';
	import { qs, qsAll } from '@/helpers/index';

	export default {
		components: {
			swiper,
			swiperSlide,
		},
		computed: {
			...mapState('common', {
				mobile: 'mobile',
				activeIsBurger: 'activeIsBurger'
			}),
			...mapState('news', {
				news: 'news',
				totalPage: 'totalPage',
				currentPage: 'currentPage'
			}),
			swiper() {
				return this.$refs.mySwiper.swiper
			},
		},
		mounted() {
			setTimeout(() => qs('.news').setAttribute('loaded', true), 100);
			setTimeout(() => qs('.bg').setAttribute('loaded', true), 100);

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
				qs('.news').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Intro'}), 400);
			},

			nextPage() {
				qs('.news').removeAttribute('loaded');
				qs('.bg').removeAttribute('loaded');

				setTimeout(() => this.$router.push({name: 'Rules'}), 400);
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

			prevNews() {
				this.$root.sendGA('internal', 'click', 'predydushhie_stati');
				qs('.news__container').classList.add('hidden');
				setTimeout(() => {
					this.$store.commit('news/PREV_PAGE');
					setTimeout(() => {
						qs('.news__container').classList.remove('hidden');
					}, 100);
				}, 600);
				
			},

			nextNews() {
				this.$root.sendGA('internal', 'click', 'pokazat_eshe');
				qs('.news__container').classList.add('hidden');
				setTimeout(() => {
					this.$store.commit('news/NEXT_PAGE');
					setTimeout(() => {
						qs('.news__container').classList.remove('hidden');
					}, 100);
				}, 600);
			},

			paginationClick(item) {
				this.$root.sendGA('external', 'click', `raspisanie_tochka_${+item+1}`);
				this.swiper.slideTo(item)
				event.target.classList.add('swiper-pagination-bullet-active')
			}
		},
		data() {
			return {
				swiperOptions: {
					slidesPerView: 1,
					spaceBetween: 50,
					on: {
						slideChange: () => {
							qs('.swiper-pagination-bullet-active').classList.remove('swiper-pagination-bullet-active');
							qsAll('.swiper-pagination-bullet')[this.swiper.activeIndex].classList.add('swiper-pagination-bullet-active');
						},
					}
				}
			}
		},
	}
</script>