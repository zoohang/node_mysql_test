# node-mysql-test
采用的express node mvc框架
基于appfog云空间，详情请访问appfog官网：
```
https://console.appfog.com/
```
## Install
```bash
git clone git://github.com/ChunMengLu/node_mysql_test.git
```
## 本地测试需要更改config.js
## appfog无需更改
```
exports.port = 3000;
exports.db = {
      url:      "localhost"
    , port:     "3306"
    , database: "test"
    , user:     "root"
    , password: "admin"
};

exports.email = {
      user:     "q596392912"
    , password: "6693722"
    , host:     "smtp.126.com"
    , ssl:      true
}
```
## *测试 启动程序
```
node app.js
```
或
```
./startup.bat 
```

如果有不明白或问题可联系email：596392912@qq.com Thanks！
