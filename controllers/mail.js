/**
 * node 邮件发送
 * @emailjs https://github.com/eleith/emailjs
 */
var email   = require("emailjs/email")
    , config = require("../config")
    , jade = require('jade')
    , fs = require('fs');

var server  = email.server.connect(config.email);

var message = {
    text:    "i hope this works",
    from:    "q596392912@126.com",
    to:      "596392912@qq.com",
//    cc:      "else@gmail.com",
    subject: "testing emailjs",
    attachment:
        [
            {data:"<html>i <i>hope</i> this works!</html>", alternative:true}
//            , {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
};

// send the message and get a callback with an error or details of the message that was sent
//server.send(message, function(err, message) { console.log(err || message); });
exports.sendSignupMail = function (user, code){
    var path = __dirname + '/../views/email/signup_mail_send.jade';
    var str = fs.readFileSync(path, 'utf8');
    var fn = jade.compile(str, { filename: path, pretty: true });
    var baseUrl = config.domain;
    var verifyUrl = baseUrl + '/finish?code=' + code;
    var actual = fn({ user: user.nick_name, baseUrl: baseUrl, verifyUrl: verifyUrl });

    message.to = user.email;
    message.text = "欢迎加Snode社区";
    message.subject = "欢迎加Snode社区";
    message.attachment[0].data = actual.trim();
    server.send(message, function(err, message) {
        console.log(err || message);
    });
}


exports.post = function(req, res){
    console.log(req.param);
    var user = req.body.user;
    var title = req.body.title;
    var content = req.body.content;

    message.to = user;
    message.text = title;
    message.subject = title;
    message.attachment[0].data = '<html>' + content + '</html>';
    console.log(message);
    server.send(message, function(err, message) {
        console.log(err || message);
    });
    res.render('mail', { title: 'Email send ok!' });
};

exports.get = function(req, res){
    res.render('mail', { title: 'Email test!' });
};