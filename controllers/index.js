/*
 * GET home page.
 */
var encrypt = require("../util/encryptUtil")
  , db = require('../dao/db')
  , config = require('../config')
  , dateUtil = require('../util/dateUtil');

exports.auth = function(req, res, next){
    if(req.session.user){
        res.locals.user = req.session.user;
        console.log("has session!");
    }else{
        var cookie = req.cookies.snode_user;
        if (cookie){
            var userName = encrypt.aesDecrypt(cookie, config.secret);
            console.log(userName);
            var sql = "SELECT id,sex FROM user where email=?";
            db.query(sql,[userName], function(error, json) {
                if(error) {
                    console.log(error);
                }
                console.log(JSON.stringify(json));
                var user = new Object();
                user.id = json[0].id;
                user.name = userName;
                user.pwd = null;
                user.sex = json[0].sex;
                req.session.user = user;
                res.locals.user = user;
                console.log("has cookie!");
                /**
                 * 说明，由于nodejs的异步 在mysql查询之前会先返回页面
                 * 所以将 next() 得分开来写
                 */
                return next();
            });
        }
    }
    return next();
}

exports.index = function(req, res){
    var df = dateUtil.format();
    console.log("time:\t" + df);
    res.render('index', { title: 'snode', index: 'activd'});
};