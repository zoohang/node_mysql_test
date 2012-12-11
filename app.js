/**
 * Module dependencies.
 */
var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , socket = require('./socket')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
	app.set('port', config.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon(__dirname + '/public/favicon.ico'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser({uploadDir: __dirname + '/public/temp'}));  // 配置默认文件上传路径
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({
        	dest: __dirname + '/public/stylesheets',    // css 目录
        	src: __dirname + '/public/less',             // less 目录
        	prefix: '/stylesheets',
        	compress: true
    	}));  // 使用less 设置压缩
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// routes
routes(app);

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log(" listening on port " + app.get('port'));
});

// socket.io
socket(server);
