/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-7
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
var mysql = require("mysql")
  , config = require("../config")
  , dburl;

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    dburl = env['mysql-5.1'][0]['credentials'];
}else{
    dburl = config.db;
}  
  
var connection = mysql.createConnection(dburl);

connection.connect(function(error) {
    if(error){
        console.log("Mysql connect error, Please check config.js! error code:" + error.code);
    }else{
        console.log("Mysql connected ...");
    }
});

exports.query = function(sql, callback) {
    connection.query(sql, function(error, rows){
        callback(error, rows);
    });
}

exports.save = function(Object, table, callback){
    var sql = 'INSERT INTO ' + table + ' (';
    var keys = [];
    var value = [];

    console.log(Object);

    for(o in Object){
        // connection.escape(userId) 防止注入
        keys.push(o);
        value.push(connection.escape(Object[o]));
    }

    sql = sql + keys.join(', ') + ') VALUES (' + value.join(', ') + ')';

    console.log(sql);

    console.log(keys);
    console.log(value);

    connection.query(sql, function(error, results) {
        console.log(error);
        console.log(results);
        callback(error, results);
    });
}
/**
 *  connection.end(function(err) {
 *      // The connection is terminated now
 *  });
*/
