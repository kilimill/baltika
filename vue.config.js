const PrerenderSpaPlugin = require('prerender-spa-plugin')
const path = require('path')
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const esmImport = require('esm')(module);
const data = esmImport('./data.js')
module.exports = {
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')

		config.plugin('define').tap(definitions => {
			definitions[0]['process.env']['NODE_ANALYTICS'] = '"development"'
			return definitions
		})
		config
			.plugin('html')
			.tap(args => {
				args[0].templateParameters = data.default
				return args
			})
	},
	css: {
		sourceMap: process.env.NODE_ENV == 'production' ? false : true
	},
	productionSourceMap: process.env.NODE_ENV == 'production' ? false : true,
	transpileDependencies: ['@cookieseater/vue-yandex-share'],
	configureWebpack: config => {
		let plugins = []
		var routes = []
		data.default.allPrerenderRoutes.forEach(el => routes.push(el))
		if (process.env.NODE_ENV === 'production') {
			plugins.push(new PrerenderSpaPlugin({
				staticDir: path.resolve(__dirname, 'dist'),
				routes: routes,
				postProcess (renderedRoute) {
				  renderedRoute.html = renderedRoute.html.replace(
				    // strip all script tags
				    /<div class=\"adhigh\"><\/div>/gmi,
            `
                    <script type="text/javascript">
            if (typeof __GetI === "undefined") {
                __GetI = [];
            }
            (function () {
                var p = {
                    type: "VIEW",

                    site_id: "6644",
                    product_id: "",
                    product_price: "",
                    category_id: "",
                    pixel_id: ""

                };
                __GetI.push(p);
                var domain = (typeof __GetI_domain) == "undefined" ? "px.adhigh.net" : __GetI_domain;
                var src = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + '/p.js';
                var script = document.createElement( 'script' );
                script.type = 'text/javascript';
                script.src = src;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(script, s);
            })();
          </script>
            `
          )
          return renderedRoute
				},
				renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
					timeout: 60000,
					renderAfterTime: 10000,
					maxConcurrentRoutes: 1
				})
			}))
		}

		plugins.push(new FaviconsWebpackPlugin({
			// Your source logo
			logo: './public/favicon_source.png',
			// The prefix for all image files (might be a folder or a name)
			prefix: 'icons-[hash]/',
			// Emit all stats of the generated icons
			emitStats: false,
			// The name of the json containing all favicon information
			statsFilename: 'iconstats-[hash].json',
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: true,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			background: '#fff',
			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: true,
				yandex: true,
				windows: true
			}
		}))

		return {
			plugins: plugins
		}

	}
}

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, './src/assets/styles/imports.styl'),
			],
		})
}
