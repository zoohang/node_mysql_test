/*
 * GET home page.
 */
var md5 = require("../util/md5Util");

exports.index = function(req, res){
    // 测试session
    console.log(md5.hex("123123"));
    console.log("测试session");
    console.log("user: " + req.session.user || "no session user!");
    res.render('index', { title: 'snode'});
};