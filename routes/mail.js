/**
 * node 邮件发送
 * @emailjs https://github.com/eleith/emailjs
 */
var email   = require("emailjs/email")
    , config = require("../config");

var server  = email.server.connect(config.email);

var message = {
    text:    "i hope this works",
    from:    "q596392912@126.com",
    to:      "596392912@qq.com",
//    cc:      "else <else@gmail.com>",
    subject: "testing emailjs",
    attachment:
        [
            {data:"<html>i <i>hope</i> this works!</html>", alternative:true}
//            , {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
};

// send the message and get a callback with an error or details of the message that was sent
//server.send(message, function(err, message) { console.log(err || message); });

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