var mysql = require("mysql")
  , config = require("../config");

var connection = mysql.createConnection(config.db);

exports.connect = function(callback) {
	callback(connection.connect());
}

exports.disconnect = function(callback) {
	callback(connection.destroy());
}

exports.query = function(sql, callback) {
	connection.query(sql, function(error, rows){
		callback(error, rows);
	});
}
