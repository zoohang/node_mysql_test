/*
 * GET users listing.
 */
var db = require('../dao/db');
var md5 = require("../util/md5Util");

exports.list = function(req, res) {
    var sql = 'SELECT * FROM user';
    db.query(sql, function(error, json) {
        if(error){
            res.render('error', {title: 'error'});
        }
        res.render('user', {'error': json, title: 'hello'});
    });
};

exports.signupGet = function(req, res){
    res.render('signup', { title: 'snode 注册'});
}

exports.signupPost = function(req, res){
    var user = req.body.user;
    var email = user.email;
    var pwd =  user.pwd;
    var rpwd = req.body.rpwd;
    console.log(email + '\t' + pwd + '\t' + rpwd);

    if(pwd != rpwd){
        res.render('error', { title: '两次密码不一样！'});
    }
    user.pwd = md5.hex(pwd);
    db.save(user, 'user', function(error, results){
        if(error){
            res.render('error', { title: '注册失败！'});
        }else{
            console.log("ID:" + results.insertId);
            user.pwd = null;
            console.log(user);
            req.session.user = user;
            console.log(md5.hex(user));
            req.cookie("snode_user", md5.hex(user), {path: '/',maxAge: 1000*60*60*24*30}); //cookie 有效期30天
            res.render('error', { title: '注册成功！'});
        }
    });
}

exports.login = function(req, res){
    res.render('blog', { title: 'snode 登陆'});
}
