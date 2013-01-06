var db = require('../dao/db')
    , util = require("../util/appUtil")
    , encrypt = require("../util/encryptUtil")
    , dateUtil = require("../util/dateUtil")
    , mailServer = require('./mail');

// 跳转到注册
exports.get = function(req, res){
    res.render('signup', { title: 'snode 注册'});
}

// 注册检测
exports.validator = function(req, res, next){
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
exports.post = function(req, res){
    var user = req.body.user;
    db.save(user, 'user', function(error, results){
        if(error){
            res.render('error', { title: '注册失败！'});
        }else{
            console.log("ID:" + results.insertId);
            user.id = results.insertId;
            user.pwd = null;
            var code = encrypt.md5Hex(user.email + new Date().getTime());
            mailServer.sendSignupMail(user, code);
            var mail_verify = new Object();
            mail_verify.user_id = user.id;
            mail_verify.verify_code = code;
            mail_verify.time = dateUtil.time();
            mail_verify.state = 0;

            console.log(mail_verify);

            db.save(mail_verify, 'mail_verify', function(error, results){});
            res.render("signup_mail", {title: '注册成功', nick_name: user.nick_name, email: user.email, url: util.emailUrl(user.email)});
        }
    });
}

// 邮件校验
exports.finish = function(req, res){
    var code = req.query.code;
    console.log(code);
    if(!code){
        res.render('error', {title: '邮箱验证失效请重现发送！'});
    }
    var sql = 'select id,user_id,time from mail_verify where verify_code=?';
    db.query(sql, [code],function(error, json) {
        if(error){
            console.log(error);
        }else{
            console.log(JSON.stringify(json));
            if(json.length > 0){
                var time = json[0].time;
                var id = json[0].id;
                var userId = json[0].user_id;
                var now = new Date().getTime();
                var times = time.getTime()  + 1000 * 60 * 60 * 24;

                if(times > now){
                    db.updateById({state:1}, 'mail_verify', id, function(error, results){});
//                    db.updateById({id:userId, email_verify: 1}, 'user_info', function(error, results){});
                    res.redirect('/login');
                }
            }
        }
        res.render('error', {title: '邮箱验证失效请重现发送！'});
    });

}