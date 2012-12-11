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
    , mail = require('./routes/mail');

module.exports = function(app){
    app.get('/', index.index);
    app.get('/users', user.list);
    app.get('/upload', file.get);
    app.post('/upload', file.post);
    app.get('/mail', mail.index);
}

