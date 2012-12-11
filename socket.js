/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-8
 * Time: 下午10:30
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
//        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
            socket.emit('my other event', { hello: 'hello world'+ new Date().getTime()});
        });
    });
}
