var fs = require('fs')
   , util = require('util')
   , config = require('../config');

exports.get = function(req, res){
    res.render('file', { title: 'upload' });
};

exports.post = function(req, res) {
    console.log(req.body);
    // 获得文件的临时路径
    var tmp_path = req.files.img.path;
    console.log(tmp_path);

    var file_name = req.files.img.name;
    var img_name = new Date().getTime() + file_name.substr(file_name.lastIndexOf('.'), file_name.length);

    var img_path = './uploads/' + img_name;
    var target_path = './public/uploads/' + img_name;

    var readStream = fs.createReadStream(tmp_path)
    var writeStream = fs.createWriteStream(target_path);

    // 移动文件
    util.pump(readStream, writeStream, function() {
        fs.unlinkSync(tmp_path);
    });
    res.set('Content-Type', 'text/html; charset=UTF-8');
    res.send('File uploaded to: ' + target_path + ' - ' + req.files.img.size + ' bytes' + img_name + '<img src='+ img_path + ' />');
}

// kindeditor 图片上传
exports.editor = function(req, res) {
    var tmp_path = req.files.imgFile.path;

    var file_name = req.files.imgFile.name;
    var img_name = new Date().getTime() + file_name.substr(file_name.lastIndexOf('.'), file_name.length);
    // 发送邮件里的图片地址 必须为全路径
    var img_path = config.domain + '/uploads/' + img_name;
    console.log(img_path);
    var target_path = './public/uploads/' + img_name;

    var readStream = fs.createReadStream(tmp_path);
    var writeStream = fs.createWriteStream(target_path);
    
    // 移动文件
    util.pump(readStream, writeStream, function() {
        fs.unlinkSync(tmp_path);
    });
    res.json({error:0, url:img_path});
}