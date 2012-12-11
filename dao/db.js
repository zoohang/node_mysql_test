/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-7
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
var mysql = require("mysql")
  , config = require("../config");

var connection = mysql.createConnection(config.db);

connection.connect(function(error) {
    if(error){
        console.log("Mysql connect error, Please check config.js! error code:" + error.code);
    }
    console.log("Mysql connected ...");
});

exports.query = function(sql, callback) {
	connection.query(sql, function(error, rows){
		callback(error, rows);
	});
}

/**
 *  connection.end(function(err) {
 *      // The connection is terminated now
 *  });
*/