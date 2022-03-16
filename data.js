const data = {
	title: 'Поддержим сборную вместе',
	url: 'https://baltika.championat.com/',
	statistics: {
		YM_ID: 42193809,
		GA_ID: 'UA-88014128-34',
		RMBT_ID: 7217768,
		PAGE_LOAD_EVENT: false
	},
	share: {
		default_img: 'https://baltika.aaadev.ru/share.png',
		title: 'Зарядим сборную на победу вместе!',
		description: 'Все самые интересные материалы про сборную России по хоккею.',
		dynamic_shares:
		{
				// 1: {
				//     img: '/share/share_1.jpg',
				//     title: 'Супрематизм или Supreme',
				//     description: 'Кажется, абстрактная живопись не ваша сильная сторона'
				// },
				// 2: {
				//     img: '/share/share_2.jpg',
				//     title: 'Ретроград в авангарде',
				//     description: 'Про супрематизм и футуризм вы возможно слышали'
				// },
				// 3: {
				//     img: '/share/share_3.jpg',
				//     title: 'Магистр авангардных искусств',
				//     description: 'Ваш следующий шаг - собственная выставка'
				// }
		}
	},

	allPrerenderRoutes: [ //without dynamic_shares
		'/',
	]

}


data.allPrerenderRoutes = data.allPrerenderRoutes.concat(Object.keys(data.share.dynamic_shares).map(el => '/' + el))

export default data
