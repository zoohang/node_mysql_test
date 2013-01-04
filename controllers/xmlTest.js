/**
 * Created with JetBrains WebStorm.
 * User: 春梦
 * Date: 13-1-2
 * Time: 下午11:56
 * To change this template use File | Settings | File Templates.
 */
var xml2js = require('xml2js')
  , fs = require('fs');

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
    res.render("signup_mail", {title: 'test'});
}
