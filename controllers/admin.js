// 管理后台
exports.get = function(req, res){
    res.render('admin', { title: 'Snode管理后台'});
}

// 登陆管理后台
exports.post = function(req, res){
    res.render('admin', { title: 'Snode管理后台'});
}

// 后台拦截
exports.auth = function(req, res){
    res.render('admin', { title: 'Snode管理后台'});
}