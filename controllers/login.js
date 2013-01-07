var db = require('../dao/db')
    , config = require('../config')
    , util = require("../util/appUtil")
    , encrypt = require("../util/encryptUtil");

// 跳转到登陆
exports.get = function(req, res){
    res.render('login', { title: 'snode 登陆'});
}

// 登陆校验
exports.validator = function(req, res, next){
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
exports.post = function(req, res){
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
