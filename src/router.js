import Vue from 'vue';
import Router from 'vue-router';
import data from '../data';

import Intro from './views/Intro'
import News from './views/News';
import Rules from './views/Rules';
import Gallery from './views/Gallery';
import Video from './views/Video';
import Product from './views/Product';

Vue.use(Router);

let routes = [
	{
		path: '/',
		component: Intro,
		name: 'Intro',
		meta: {
			key: 1,
		},
	},
	{
		path: '/news',
		component: News,
		name: 'News',
		meta: {
			key: 2,
		},
	},
	{
		path: '/rules',
		component: Rules,
		name: 'Rules',
		meta: {
			key: 3,
	},
	},
	{
		path: '/gallery',
		component: Gallery,
		name: 'Gallery',
		meta: {
			key: 4,
		},
	},
	{
		path: '/video',
		component: Video,
		name: 'Video',
		meta: {
			key: 5,
		},
	},
	{
		path: '/product',
		component: Product,
		name: 'Product',
		meta: {
			key: 6,
		},
	},
];

if (Object.keys(data.share.dynamic_shares).length > 0) {
	Object.keys(data.share.dynamic_shares).forEach((el) => {
		routes.push({
			path: '/' + el,
			name: el
		})
	})
}

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					x: 0,
					y: 0
				})
			}, 500)
		})
	},
	routes
})

router.afterEach((to) => {
	// eslint-disable-next-line
	gtag('config', data.statistics.GA_ID, { 'page_path': to.path });
});


if (Object.keys(data.share.dynamic_shares).length > 0) {
	router.beforeEach((to, from, next) => {
		if (data.share.dynamic_shares[to.name] === undefined || data.share.dynamic_shares[to.name] === null) {
			document.querySelector('meta[property="og:image"]')['content'] = data.share.default_img
			document.querySelector('meta[property="og:title"]')['content'] = data.share.title
			document.querySelector('meta[property="og:description"]')['content'] = data.share.description
			document.querySelector('meta[name="twitter:image"]')['content'] = data.share.default_img
		} else {
			document.querySelector('meta[property="og:image"]')['content'] = data.share.dynamic_shares[to.name].img
			document.querySelector('meta[property="og:title"]')['content'] = data.share.dynamic_shares[to.name].title
			document.querySelector('meta[property="og:description"]')['content'] = data.share.dynamic_shares[to.name].description
			document.querySelector('meta[name="twitter:image"]')['content'] = data.share.dynamic_shares[to.name].img
		}
		next()
	});
}


export default router
