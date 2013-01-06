var encrypt = require("../util/encryptUtil")
  , db = require('../dao/db')
  , config = require('../config')
  , dateUtil = require('../util/dateUtil');

/**
 * 对用户的登陆状态进行维护
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
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
                if(json.length > 0){
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
                }
                return next();
            });
        }
    }
    return next();
}

// index
exports.get = function(req, res){
    var df = dateUtil.format();
    console.log("time:\t" + df);
    res.render('index', { title: 'snode', index: 'activd'});
};