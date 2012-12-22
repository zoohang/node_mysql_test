// domain 记录于config中
var socket = io.connect('#{domain}');
socket.on('join', function (data) {
    console.log(data);
    join(data);
});
socket.on('quit', function (data) {
    console.log(data);
    quit(data);
});
socket.on('broadcast', function (data) {
    console.log(data);
    $(".left").append("<div><p>id:<span>" + data.cid + "</span></p><p class='msg'>" + data.w + "</p></div>");
    $('.left')[0].scrollTop = $('.left')[0].scrollHeight;
});
$(function(){
    $(".reset").click(function(){
        $("textarea").val("").focus();
    });
    $(".submit").click(function(){
        var msg = $("textarea").val();
        if(msg == ''){
            alert('亲，再写多点吧！');
            return;
        }else{
            socket.emit('say', {w: msg});
            $("textarea").val("").focus();
        }
        return false;
    });
});
function addMarquee(message){
    $(".marquee").html('<marquee direction="right" scrollamount="6" onmouseover="this.stop()" onmouseout="this.start()">' + message + '</marquee>');
}
function join(data){
    var msg = data.cid + '加入了！';
    addMarquee(msg);
    var temp = true;
    $(".rigth p").each(function(){
        if($(this).text() == data.cid){
            temp = false;
        }
    });
    if(temp){
         $(".rigth").append("<p>" + data.cid + "</p>");
    }
}
function quit(data){
   var msg = data.cid + ' 退出了！';
   addMarquee(msg);
   $('.rigth p').each(function() {
       if($(this).text() == data.cid){
           $(this).remove();
       }
   });
}