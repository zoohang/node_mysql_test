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

// 跳转注册
exports.signupGet = function(req, res){
    res.render('signup', { title: 'snode 注册'});
}

// 注册检测
exports.signupValidator = function(req, res, next){
    var user = req.body.user;
    req.assert(['user', 'email'], '邮箱格式错误！').isEmail();
    req.assert(['user', 'pwd'], '密码为6~20个字符！').len(6, 20);
    req.assert(['user', 'nick_name'], '昵称为4~20个字符！').len(4, 20);

    var errors = req.validationErrors();
    console.log(errors);

    if(errors){
        res.render('signup', {title:"注册",errors: errors});
        return;
    }else{
        user.pwd = encrypt.md5Hex(user.pwd);
        // 检查用户是否存在
        var sql = "SELECT 1 FROM user where email=? or nick_name=?";
        db.query(sql,[user.email, user.nick_name], function(error, json) {
            if(error) {
                console.log(error);
            }
            console.log(JSON.stringify(json));
            if(json.length > 0){
                res.render("error", {title: "邮箱或昵称已存在！"});
            }else{
                return next();
            }
        });
    }
}

// 保存注册用户 发送激活邮件
exports.signupPost = function(req, res){
    var user = req.body.user;
    db.save(user, 'user', function(error, results){
        if(error){
            res.render('error', { title: '注册失败！'});
        }else{
            console.log("ID:" + results.insertId);
            user.id = results.insertId;
            user.pwd = null;



            res.render("signup_mail", {title: '注册成功', nick_name: user.nick_name, email: user.email, url: util.emailUrl(user.email)});
        }
    });
}

// 跳转到登陆
exports.loginGet = function(req, res){
    res.render('login', { title: 'snode 登陆'});
}

// 登陆校验
exports.loginValidator = function(req, res, next){
    var user = req.body.user;
    req.assert(['user', 'email'], '邮箱格式错误！').isEmail();
    req.assert(['user', 'pwd'], '密码为6~20个字符！').len(6, 20);
    var errors = req.validationErrors();

    console.log(errors);
    if(errors){
        res.json({errors: errors});
        return;
    }
    user.pwd = encrypt.md5Hex(user.pwd);
    return next();
}

// 登陆
exports.loginPost = function(req, res){
    var user = req.body.user;

    var sql = 'select * from user where email=? and pwd=?';
    db.query(sql,[user.email, user.pwd], function(error, json) {
        if(error){
            console.log(error);
        }
        if(json.length > 0){
            var remember = req.body.remember;
            if(remember != null){
                var auth_token = encrypt.aesEncrypt(user.email, config.secret);
                res.cookie('snode_user', auth_token, {path: '/', maxAge: config.maxAge}); //cookie 有效期30天
            }
            req.session.user = json[0];
            res.locals.user = json[0];
            res.redirect('/');
        }
        res.json({errors: '用户名或密码错误！'});
    });
}

// 登出
exports.logout = function(req, res){
    req.session.destroy();
    res.clearCookie('snode_user', { path: '/' });
    res.redirect('/');
}
