/**
 * Module dependencies.
 */
var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , socket = require('./socket')
  , http = require('http')
  , path = require('path')
  , redis = require('redis');

var app = express();
var RedisStore = require('connect-redis')(express);

app.configure(function(){
    app.set('port', process.env.VCAP_APP_PORT || config.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir: __dirname + '/public/temp'}));  // 配置默认文件上传路径
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.secret,
        store: new RedisStore({ host: 'localhost', port: 6397})
    }));
    app.use(app.router);
    app.use(require('less-middleware')({
        dest: __dirname + '/public/stylesheets',    // css 目录
        src: __dirname + '/public/less',             // less 目录
        prefix: '/stylesheets',
        compress: true
    }));  // 使用less 设置压缩
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        next();
    });
    app.use(function(err, req, res, next){
        // if an error occurs Connect will pass it down
        // through these "error-handling" middleware
        // allowing you to respond however you like
        res.send(500, { error: 'Sorry something bad happened!' });
    });
});

// 开发环境
app.configure('development', function(){
    app.use(express.errorHandler());
});
// 现网
app.configure('production', function () {
    app.use(express.errorHandler());
    app.set('view cache', true);
});

// routes
routes(app);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log(" listening on port " + app.get('port'));
});

// socket.io
socket(server);
