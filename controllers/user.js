var db = require('../dao/db')
   , config = require('../config')
   , util = require("../util/appUtil")
   , encrypt = require("../util/encryptUtil");

exports.list = function(req, res) {
    var sql = 'SELECT * FROM user';
    db.query(sql,[], function(error, json) {
        if(error){
            res.render('error', {title: 'error'});
        }else{
            res.render('user', {'error': json, title: 'hello'});
        }
    });
};