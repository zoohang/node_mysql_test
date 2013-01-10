/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 13-1-2
 * Time: 下午11:56
 * To change this template use File | Settings | File Templates.
 */
var xml2js = require('xml2js')
    , jade = require('jade')
    , fs = require('fs')
    , dao = require("../dao/db.js");

exports.get = function(req, res){
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/../xml/test.xml', function (err, data) {
        if (err) throw err;
        console.log(data.toString());
        parser.parseString(data.toString(), function(err,result){
            //Extract the value from the data element
            console.log(JSON.stringify(result));
            res.redirect("/");
        });
    });
}

exports.test = function(req, res){
    dao.tableName = 'user';
    res.render("signup_mail", {title: 'test'});
}

exports.jadetest = function(req, res){
    var path = __dirname + '/../views/email/signup_mail_send.jade';
    var str = fs.readFileSync(path, 'utf8');
    var fn = jade.compile(str, { filename: path, pretty: true });
    var actual = fn({ user: 'Jade', baseUrl: 'http://snode.hp.af.cm/', verifyUrl: 'http://snode.hp.af.cm?code=123123123' });
    console.log(actual.trim());
    res.send(actual.trim());
//    res.render("signup_mail", {title: 'test'});
}