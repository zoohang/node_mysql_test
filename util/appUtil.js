/**
 * Utils
 */
exports.emailUrl = function (mail){
    var url = 'http://';
    if(mail.indexOf('mail') != -1){
        url = mail.substr(mail.indexOf('@') + 1, mail.length);
    }else{
        url = 'mail.' + mail.substr(mail.indexOf('@') + 1, mail.length);
    }
    return url;
}