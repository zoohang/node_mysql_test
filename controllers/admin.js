var encrypt = require("../util/encryptUtil");

// 管理后台
exports.get = function(req, res){
    res.render('admin/signin', { title: 'Snode管理后台'});
}

// 登陆管理后台
exports.post = function(req, res){
    var admin = req.body.admin;
    var remember = req.body.remember;
    console.log(remember);

    admin.password = encrypt.md5Hex(admin.password)
    console.log(admin);
    req.session.admin = admin;
    res.locals.admin = admin;
    res.render('admin/index', { title: 'Snode管理后台'});
}

// 后台拦截
exports.auth = function(req, res, next){
    if(req.session.admin){
        res.locals.admin = req.session.admin;
        console.log("has session!");
        return next();
    }else{
        //res.render('admin/signin', { title: 'Snode管理后台'});
        return next();
    }
}

// 登出
exports.logout = function(req, res){
    req.session.destroy();
    res.clearCookie('snode_admin', { path: '/' });
    res.redirect('/');
    return;
}