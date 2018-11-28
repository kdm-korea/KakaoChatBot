var express = require('express');
var http = require('http');
var app = express();

//search Module use
var searchRes = require('./Crawling.js');
//weather Module use
var weatherRss = require('./Weather.js');
//userres Module use
//var userRes = require('./User.js');

app.get('/keyboard',(req,res)=>{
    var send={};
    
    send.message={
        text:'안녕하세요'
    };
    res.json(send); 
});

// app.get('/keyboard',function(req,res){
//     var send={};
    
//     send.message={
//         text:'안녕하세요'
//     };
            
//     res.json(send);
// });

var sendTxt = (sendMsg, send)=>{
    var send = {};
    send.message={
        text: sendMsg
    };
    return send;
}

var sendBtn = (btn1, btn2, send)=>{
    var send = {};
    send.keyboard={
        type:buttons,
        buttons:[btn1, btn2]
    };
    return send;
}

app.post('/message', (req, res)=>{
    //Client Write Msg
    var msg = req.body.content;
    
//    DB check
//    DB delete space
    var compare = msg.replace(/(\s*)/g,"");
    console.log(compare);

    switch(msg){
        case '안녕':
            res.json(sendTxt('안녕하세요'),{});
            break;
        case '사과':
            res.json(sendTxt('맛있다'),{});
            break;
        case '날씨':
            weatherRss.weatherRes(200, (values)=>{ //Weather Crawling
                res.json(sendTxt(values),{});
            });
            break;
        case '안알려줄래요': //DB Not Using
            res.json(sendTxt('다음에는 알려주세요! :)'),{});
            break;
        case '알려줄래요': //DB Using
            res.json(sendTxt('아직 준비가 안되었어요 :('),{});
            break;
        default:
            searchRes.questRes(msg,values=>{ //Google Search
                if(values == 'ERROR'){
                    res.json(sendBtn('알려줄래요','안알려줄래요',sendTxt('가르쳐 주실래요?'),{}));
                }
                else{
                    res.json(examMsg(values));
                }
            });
            break;
    }
});
// send 객체를 만들어주는 함수

http.createServer(app).listen(9111, function(){
    console.log('실행중');
});//형식검사