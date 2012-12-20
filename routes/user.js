
/*
 * GET users listing.
 */
var db = require('../dao/db');

exports.list = function(req, res) {
  var sql = 'SELECT * FROM user';	
  db.query(sql, function(error, json) {
    if(error){
    	res.render('error', {title: 'error'});
    }
    res.render('user', {'error': json, title: 'hello'});
  });
};

exports.signup = function(req, res){
    res.render('blog', { title: 'snode 注册'});
}
exports.login = function(req, res){
    res.render('blog', { title: 'snode 登陆'});
}