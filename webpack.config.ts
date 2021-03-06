import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
	devtool: 'eval',
	mode: 'development',
	entry: './src/index.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				use: 'file-loader',
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file-loader',
				include: path.resolve(__dirname, 'src'),
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'css', 'scss'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		contentBasePublicPath: '/liquidator',
		compress: true,
		hot: true,
		open: true,
		openPage: 'liquidator',
		port: 5000,
		historyApiFallback: true,
		hotOnly: true,
	},
	optimization: {
		minimize: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};

export default config;
