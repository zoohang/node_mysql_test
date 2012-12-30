/*
 * GET users listing.
 */
var db = require('../dao/db');
var md5 = require("../util/md5Util");

exports.list = function(req, res) {
    var sql = 'SELECT * FROM user';
    db.query(sql,[], function(error, json) {
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
            user.id = results.insertId;
            user.pwd = null;
            console.log(user);
            req.session.user = user;
            console.log(md5.hex(user));
            // req.cookie("snode_user", md5.hex(user), {path: '/',maxAge: 1000*60*60*24*30}); //cookie 有效期30天
//            res.render('error', { title: '注册成功！'});
            res.redirect("/users");
        }
    });
}

exports.loginGet = function(req, res){
    res.render('login', { title: 'snode 登陆'});
}

exports.loginPost = function(req, res){
    var user = req.body.user;
    var pwd =  user.pwd;
    user.pwd = md5.hex(pwd);
    var remember = req.body.remember;

    if(remember != null){
        res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
    }

    var sql = 'select count(1) as count from user where name=? and pwd=?';
    db.query(sql,[user.name, user.pwd], function(error, json) {
        if(error){
            res.render('error', {title: 'error'});
        }
        console.log(JSON.stringify(json));

        if(json.length > 0){
            req.session.user = user;
            res.locals.user = user;
            console.log('Add session!');
        }
        res.redirect('/');
    });
}