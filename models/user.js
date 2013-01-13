var dao = require('../dao/db');

module.exports = userDao;

// test
userDao = function(){
    this.table = 'user_info'
}
// test
userDao.prototype.install = function(){
    // Object, table, callback
    dao.save(user, user.table, function(error, data){

    });
}
