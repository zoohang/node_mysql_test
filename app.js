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
    app.set('port', process.env.VCAP_APP_PORT || config.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir: __dirname + '/public/temp'}));  // 配置默认文件上传路径
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: config.secret}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(error, req, res, next){
        // 配置错误页面
        res.render("errer", { title: 'Sorry something bad happened!' });
    });
});

// 开发环境
app.configure('development', function(){
    app.use(express.errorHandler());
});
// 现网
app.configure('production', function () {
    app.use(express.static(static_dir, {
        maxAge : config.maxAge
    }));
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
