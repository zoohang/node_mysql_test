/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 12-12-7
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
var config = require("../config")
  , poolModule = require('generic-pool');

/**
 * mysql pool
 * @type {Object}
 */
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

/**
 * mysql query
 * @param sql
 * @param param
 * @param callback
 */
exports.query = function(sql, param, callback) {
    console.log(sql);
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

/**
 * mysql insert
 * @param Object
 * @param table
 * @param callback
 */
exports.save = function(Object, table, callback){
    var sql = 'INSERT INTO ' + table + ' (';
    var keys = [];
    var order = [];
    var value = [];
    for(o in Object){
        keys.push(o);
        order.push('?');
        value.push(Object[o]);
    }
    sql = sql + keys.join(', ') + ') VALUES (' + order.join(', ') + ')';

    console.log(sql);
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

/**
 * mysql update
 * @param Object      * old Object
 * @param Object      * new Object
 * @param table
 * @param callback
 */
exports.updateById = function(Object, id, table, callback){
    // UPDATE `user` SET `pwd`='123456' WHERE (`id`='15')
    // UPDATE `user_info` SET `nick_name`='1', `real_name`='1' WHERE (`id`='9')
    var sql = 'UPDATE ' + table + ' SET ';
    var keys = [];
    var value = [];
    for(o in Object){
        keys.push(o + '=?');
        value.push(Object[o]);
    }
    sql += keys.join(', ') + ' WHERE (id = ?)';
    value.push(id);

    console.log(sql);
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

/**
 * mysql delete
 * @param Object
 * @param table
 * @param callback
 */
exports.delete = function(Object, table, callback){
    // DELETE FROM `user` WHERE (`id`='41')
    var sql = 'DELETE FROM ' + table + ' WHERE (';

    var keys = [];
    var value = [];
    for(o in Object){
        keys.push(o + '=?');
        value.push(Object[o]);
    }
    sql += keys.join(" and ") + ")";

    console.log(sql);
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