const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	mode:   'development',
	entry:  { main: path.join(__dirname, '/src/index.js') },
	output: {
		filename: '[name].js',
		path:     path.join(__dirname, '/dist')
	},
	watch:     false,
	// devtool:   'cheap-eval-source-map',
	devtool:   false,
	devServer: {
		contentBase:        './dist',
		publicPath:         '/',
		port:      	        8080,
		quiet:              true,
		historyApiFallback: true,
		overlay:            {
			warnings: false,
			errors:   true
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title:    'Example animated Transitions for react router/styled-component',
			template: path.join(__dirname, '/public/index.html')
		}),
		new FriendlyErrorsWebpackPlugin(),
		new webpack.SourceMapDevToolPlugin({ filename: '[file].map' })
	],
	module: { rules: [
		{
			enforce: 'pre',
			test:    /\.(js|jsx)$/,
			exclude: /node_modules/,
			use:     [
				{
					loader:  'eslint-loader',
					options: { fix: true }
				},
				{ loader: 'stylelint-custom-processor-loader' }
			]
		},
		{
			test:    /\.(js|jsx)$/,
			exclude: /node_modules/,
			use:     {
				loader:  'babel-loader',
				options: { plugins: [] }
			}
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			use:  [
				{
					loader:  'file-loader',
					options: {
						name:       '[name].[ext]',
						outputPath: 'images/'
					}
				}
			]
		}
	] },
	resolve: { extensions: ['.js', '.jsx'] }
};
