
/*
 * GET home page.
 */
var util = require("../util/md5Util");

exports.index = function(req, res){
    console.log(util.md5_hex("123123"));
    res.render('index', { title: 'Express' });
};