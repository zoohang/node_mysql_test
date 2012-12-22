/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-8
 * Time: 下午10:30
 * To change this template use File | Settings | File Templates.
 */
// appfog 环境
var cloudPort = process.env.VCAP_APP_PORT;
var cloudServices = process.env.VCAP_SERVICES;
// 端口
exports.port = cloudPort || 3000;
// url供socket.io使用
exports.domain = cloudPort ? 'http://snode.hp.af.cm' : 'http://localhost:3000';
// 数据库url
if(cloudServices){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    exports.db = env['mysql-5.1'][0]['credentials'];
}else{
    exports.db = {
          url:      "localhost"
        , port:     "3306"
        , database: "snode"
        , user:     "root"
        , password: "root"
    }
};
// secret
exports.secret = "snode";
// email 配置
exports.email = {
      user:     "q596392912"
    , password: "6693722"
    , host:     "smtp.126.com"
    , ssl:      true
}
