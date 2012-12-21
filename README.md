# node-mysql-test
采用的express node mvc框架
基于appfog云空间，详情请访问appfog官网：
```
https://console.appfog.com/
```
# Install
```
git clone git://github.com/ChunMengLu/node_mysql_test.git
```
* 注意jade模版，一行不能同时出现`空格`和`tab`，开发时请将`空格`和`tab`调成可视状态！
* 本demo已经将全部的`tab`转换成了4个`空格`。
# 本地测试需要更改config.js
*appfog无需更改
```
exports.port = 3000;
exports.domain = 'http://snode.hp.af.cm';
exports.db = {
      url:      "localhost"
    , port:     "3306"
    , database: "test"
    , user:     "root"
    , password: "root"
};

exports.email = {
      user:     "q596392912"
    , password: "6693722"
    , host:     "smtp.126.com"
    , ssl:      true
}
```
# socket.io 更改
```
public/javascripts/index-socket.js

var socket = io.connect('http://snode.hp.af.cm/');
```
暂时没做成自适应的，下次抽空跟新吧！

# *测试 启动程序
```
node app.js
```
或
```
./startup.bat 
```

请删除掉views/common/_layout.jade中的百度统计代码！

如果有不明白或问题可联系email：596392912@qq.com Thanks！
