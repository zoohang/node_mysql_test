/*
 * GET home page.
 */
exports.index = function(req, res){
    // 测试session
    console.log("测试session");
    console.log("user: " + req.session.user || "no session user!");
    res.render('index', { title: 'snode'});
};