/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-8
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */
var index = require('./routes/index')
    , user = require('./routes/user')
    , file = require('./routes/file')
    , mail = require('./routes/mail')
    , socket = require('./routes/socket.io')
    , blog = require("./routes/blog")
    , demo = require("./routes/demo");

module.exports = function(app){
    // home page
    app.get('/', index.index);


    app.get('/users', user.list);

    app.get('/signup', user.signup);
    app.get('/login', user.login);

    app.get("/blog", blog.get);
    app.get("/blog", blog.get);

    app.get("/demo", demo.get);

    app.get('/upload', file.get);
    app.post('/upload', file.post);
    app.post('/upload/editor', file.editor);
    app.get('/mail', mail.get);
    app.post('/mail', mail.post);

    // socket.io chat room
    app.get('/socket', socket.index);
}

