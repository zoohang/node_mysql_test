/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-8
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */
var index = require('./controllers/index')
  , user = require('./controllers/user')
  , file = require('./controllers/file')
  , mail = require('./controllers/mail')
  , socket = require('./controllers/socket.io')
  , blog = require('./controllers/blog')
  , demo = require('./controllers/demo');

module.exports = function(app){
    // 配置session 页面中使用 user 获取
    app.all('*', function(req, res, next){
        res.locals.user = req.session.user;
        next();
    });

    // home page
    app.get('/', index.index);

    // user
    app.get('/users', user.list);

    // 注册
    app.get('/signup', user.signupGet);
    app.post('/signup', user.signupPost);

    // 登陆
    app.get('/login', user.loginGet);
    app.post('/login', user.loginPost);

    // blog 相关
    app.get("/blog", blog.get);
    app.get("/blog", blog.get);

    app.get("/demo", demo.get);

    // 上传相关
    app.get('/upload', file.get);
    app.post('/upload', file.post);
    app.post('/upload/editor', file.editor);

    // 邮件相关
    app.get('/mail', mail.get);
    app.post('/mail', mail.post);

    // socket.io chat room
    app.get('/socket', socket.index);
}

