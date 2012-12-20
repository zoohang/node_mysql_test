/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-19
 * Time: 下午11:20
 * To change this template use File | Settings | File Templates.
 */
exports.get = function(req, res){
    res.render('blog', { title: 'blog'});
};