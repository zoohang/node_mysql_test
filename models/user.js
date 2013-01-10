var dao = require('../dao/db');

module.exports = user;

// test
user = function(){
    this.table = 'user_info'
}
// test
user.prototype.install = function(){
    // Object, table, callback
    dao.save(user, user.table, function(error, data){

    });
}
