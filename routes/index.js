
/*
 * GET home page.
 */
var md5 = require("../util/md5Util");

exports.index = function(req, res){
    console.log(md5.hex("123123"));
    res.render('index', { title: 'snode'});
};