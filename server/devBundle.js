import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotmiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack.config.client';

const compile = app => {
	if (process.env.NODE_ENV == 'development') {
		const compiler = webpack(webpackConfig);
		const middleware = webpackMiddleWare(compiler, {
			publicPath: webpackConfig.output.publicPath,
		});
		app.use(middleware);
		app.use(webpackHotmiddleware(compiler));
	}
};
export default { compile };
