/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-7
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
var config = require("../config")
  , poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback) {
        var connection = require("mysql").createConnection(config.db);
        connection.connect();
        // parameter order: err, resource
        // new in 1.0.6
        callback(null, connection);
    },
    destroy  : function(client) { client.end(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
    // if true, logs via console.log - can also be a function
    log : false
});

exports.query = function(sql, param, callback) {
    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, param, function(error, rows) {
                callback(error, rows);
                // return object back to pool
                pool.release(client);
            });
        }
    });
}

exports.save = function(Object, table, callback){
    var sql = 'INSERT INTO ' + table + ' (';
    var keys = [];
    var aa = [];
    var value = [];

    for(o in Object){
        keys.push(o);
        aa.push('?');
        value.push(Object[o]);
    }

    sql = sql + keys.join(', ') + ') VALUES (' + aa.join(', ') + ')';

    console.log(sql);

    console.log(keys);
    console.log(value);

    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, value, function(error, rows) {
                callback(error, rows);
                // return object back to pool
                pool.release(client);
            });
        }
    });
}
