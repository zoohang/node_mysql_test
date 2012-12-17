
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
