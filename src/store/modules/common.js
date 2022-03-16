export default {
	namespaced: true,
	state: {
		mobile: (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth < 661),
		activeIsBurger: false,
	},
	mutations: {
		SHOW_BURGER(state, data) {
			state.activeIsBurger = data;
		},
	}
};
