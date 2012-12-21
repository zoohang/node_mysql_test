/**
 * md5 工具
 * @type {*}
 */
var crypto = require('crypto');

exports.hex = function (src) {
    var md5Str, md5 = crypto.createHash('md5');
    /**
     * js 类型
     * 1. Undefined
     * 2. Null
     * 3. Boolean
     * 4. String
     * 5. Number
     * 6. Object
     * 7. Function
     */
    // undefined == null  (true)
    if(src == null){
        md5Str = new Date().getTime().toString();
    }else if(src.constructor == Array){
        md5Str = src.join('-');
    }else if(src.constructor == Object){
        for(s in src){
            md5Str += s + src[s];
        }
    }else{
        md5Str = src.toString();
    }
    md5.update(md5Str, 'utf8');
    return md5.digest('hex');
}

