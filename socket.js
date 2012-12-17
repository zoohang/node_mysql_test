/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-8
 * Time: 下午10:30
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(server){
    var io = require('socket.io').listen(server, {log:false});
    var conns = {};
    io.sockets.on('connection', function (socket) {
        var cid = socket.id;
        for(var ccid in conns) {
            var soc = conns[ccid];
            soc.emit('join', {cid: socket.id});
        }
        conns[cid] = socket;
        socket.on('disconnect', function () {
            delete conns[cid];
            for(var cid in conns) {
                var soc = conns[cid];
                soc.emit('quit', {cid: cid});
            }
        });
        socket.on('say', function (data) {
            data.cid = cid;
            for(var ccid in conns) {
                var soc = conns[ccid];
                soc.emit('broadcast', data);
            }
        });
    });
}
