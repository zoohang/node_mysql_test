/*
 * GET users listing.
 */
var db = require('../dao/db')
   , config = require('../config')
   , encrypt = require("../util/encryptUtil");

exports.list = function(req, res) {
    var sql = 'SELECT * FROM user';
    db.query(sql,[], function(error, json) {
        if(error){
            res.render('error', {title: 'error'});
        }
        res.render('user', {'error': json, title: 'hello'});
    });
};

// 跳转注册
exports.signupGet = function(req, res){
    res.render('signup', { title: 'snode 注册'});
}

// 注册检测
exports.signupPost = function(req, res, next){
    var user = req.body.user;
    var email = user.email;
    var pwd =  user.pwd;
    var rpwd = req.body.rpwd;
    console.log(email + '\t' + pwd + '\t' + rpwd);

    if(pwd != rpwd){
        res.render('error', { title: '两次密码不一样！'});
    }
    user.pwd = encrypt.md5Hex(pwd);
    // 检查用户是否存在
    var sql = "SELECT 1 FROM user where name=?";
    db.query(sql,[user.name], function(error, json) {
        if(error) {
            console.log(error);
        }
        console.log(JSON.stringify(json));
        if(json.length > 0){
//            req.json("title");
//            res.redirect("/");
            res.render("error", {title: "用户已存在！"});
        }else{
            return next();
        }
    });
}
// 保存注册用户
exports.signupSave = function(req, res){
    var user = req.body.user;
    db.save(user, 'user', function(error, results){
        if(error){
            res.render('error', { title: '注册失败！'});
        }else{
            console.log("ID:" + results.insertId);
            user.id = results.insertId;
            user.pwd = null;
            res.redirect("/login");
        }
    });
}

// 跳转到登陆
exports.loginGet = function(req, res){
    res.render('login', { title: 'snode 登陆'});
}

// 登陆
exports.loginPost = function(req, res){
    var user = req.body.user;
    var pwd =  user.pwd;
    user.pwd = encrypt.md5Hex(pwd);
    var remember = req.body.remember;

    if(remember != null){
        var auth_token = encrypt.aesEncrypt(user.name, config.secret);
        res.cookie('snode_user', auth_token, {path: '/', maxAge: config.maxAge}); //cookie 有效期30天
    }

    var sql = 'select count(1) as count from user where name=? and pwd=?';
    db.query(sql,[user.name, user.pwd], function(error, json) {
        if(error){
            res.render('error', {title: 'error'});
        }
        if(json.length > 0){
            req.session.user = user;
            res.locals.user = user;
        }
        res.redirect('/');
    });
}

// 登出
exports.logout = function(req, res){
    req.session.destroy();
    res.clearCookie('snode_user', { path: '/' });
    res.redirect('/');
}
