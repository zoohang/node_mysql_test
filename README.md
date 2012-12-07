# node-mysql-test
采用的express node mvc框架
## Install
```bash
git clone git://github.com/ChunMengLu/node_mysql_test.git
```
## 更改config.js
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

## 启动程序
你可以通过
```
node app.js
```
或者使用
```
./startup.bat  || ./startup.sh
```
来启动程序