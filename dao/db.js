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
exports.querySql = function(sql, param, callback) {
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
 * mysql query
 * @param sql
 * @param param
 * @param callback
 */
exports.query = function(Object, table, param, callback) {
    // SELECT * FROM `user` WHERE id='1';
    var sql = "SELECT " + param.join(', ') + ' FROM ' + table;
    var keys = [];
    var values = [];
    // var user = {};
    var temp = false;
    for(var o in Object){
        keys.push(o + '=?');
        values.push(Object[o]);
        temp = true;
    }
    if(temp){
        sql += ' WHERE ';
        if(Object.id){
            sql += 'id =?';
            values = [Object.id];
        }else{
            sql += keys.join(' AND ');
        }
    }

    console.log(sql);
    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, values, function(error, rows) {
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
    var sql = 'INSERT INTO ' + table + ' SET ?';
    console.log(sql);
    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, Object, function(error, rows) {
                callback(error, rows);
                // return object back to pool
                pool.release(client);
            });
        }
    });
}

/**
 * mysql update
 * @param Object
 * @param table
 * @param callback
 */
exports.updateById = function(Object, table, id, callback){
    // UPDATE `user` SET `pwd`='123456' WHERE (`id`='15')
    // UPDATE `user_info` SET `nick_name`='1', `real_name`='1' WHERE (`id`='9')
    var sql = 'UPDATE ' + table + ' SET ';
    var keys = [];
    var values = [];
    for(var o in Object){
        keys.push(o + '=?');
        values.push(Object[o]);
    }
    sql += keys.join(', ') + ' WHERE id = ?';
    values.push(id);

    console.log(sql);
    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, values, function(error, rows) {
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
    var values = [];
    for(var o in Object){
        keys.push(o + '=?');
        values.push(Object[o]);
    }
    sql += keys.join(" AND ") + ")";

    console.log(sql);
    pool.acquire(function(error, client) {
        if (error) {
            // handle error - this is generally the err from your
            // factory.create function
            callback(error, null);
        }else {
            client.query(sql, values, function(error, rows) {
                callback(error, rows);
                // return object back to pool
                pool.release(client);
            });
        }
    });
}