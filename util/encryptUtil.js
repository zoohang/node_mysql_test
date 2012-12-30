/**
 * 加密 工具
 * @type {*}
 */
var crypto = require('crypto');

exports.md5Hex = function (src) {
    var md5 = crypto.createHash('md5');
    md5.update(src, 'utf8');
    return md5.digest('hex');
}
exports.aesEncrypt = function(str,secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str,'utf8','hex');
    enc += cipher.final('hex');
    return enc;
}
exports.aesDecrypt = function(str,secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
