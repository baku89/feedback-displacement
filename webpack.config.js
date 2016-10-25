const webpack = require('webpack')

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].js',
		publicPath: '/js/'
	},
	resolve: {
		alias: {},
		modulesDirectories: [
			'node_modules',
			'web_modules'
		]
	},
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /node_modules|web_modules/
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus'
			},
			{
				test: /\.(vert|frag|glsl)$/,
				loader: 'raw!glslify'
			}
		]
	},
	stylus: {
		use: [require('nib')()]
	},
	eslint: {
		configFile: './.eslintrc',
		formatter: require('eslint-friendly-formatter'),
		failOnError: true
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/),
		new webpack.ProvidePlugin({
			Vue: 'vue',
			$: 'jquery',
			THREE: 'three',
			_: 'lodash',
		})
	]
}
