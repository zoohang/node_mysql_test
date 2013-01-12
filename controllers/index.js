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
        return next();
    }else{
        var cookie = req.cookies.snode_user;
        if (cookie){
            var auth_token = encrypt.aesDecrypt(cookie, config.secret);
            console.log(auth_token);
            var tokens = auth_token.split(',');
            var user = {
                email: tokens[0],
                nick_name: tokens[1]
            };
            //Object, table, param
            db.query(user, 'user', ['id','email', 'nick_name'], function(error, json) {
                if(error) {
                    console.log(error);
                }
                console.log(JSON.stringify(json));
                if(json.length > 0){
                    req.session.user = json[0];
                    res.locals.user = json[0];
                    console.log("has cookie!");
                    /**
                     * 说明，由于nodejs的异步 在mysql查询之前会先返回页面
                     * 所以将 next() 得分开来写
                     */
                }
                return next();
            });
        }else{
            return next();
        }
    }
}

// index
exports.get = function(req, res){
    var df = dateUtil.time();
    console.log("time:\t" + df);
    res.render('index', { title: 'snode', index: 'activd'});
};