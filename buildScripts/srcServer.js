import express from 'express';
import open from 'open';
import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const  port = 3000;

const app = new express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
	//noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../src/index.htm'));
});

app.listen(port, function(err){
	if(err){
		console.log(err);
	}else{
	open('http://localhost:' + port);
	let message = 'dev server started @ http://localhost:'+port;
	console.log(chalk.green(message));
	}
});