var express = require('express');
var http = require('http');
var app = express();

//search Module use
var searchRes = require('./Crawling.js');
//weather Module use
var weatherRss = require('./Weather.js');
//userres Module use
//var userRes = require('./User.js');

app.get('/keyboard',function(req,res){
    var send={};
    send.message={
        text:'안녕하세요'
    };
            
    res.json(send);
});

app.post('/message', function(req, res){
    //Client Write Msg
    var msg = req.body.content;
    //Res Message
    var send = {};
    
//    DB check
//    DB delete space
    var compare = msg.replace(/(\s*)/g,"");
    console.log(compare);
//    userRes.userRes(compare, function(values){
//       if(values != 'ERROR'){
//           send = {
//               'message':{
//                    'text': values
//                }
//           }
//           res.json(send);
//       }
//    });
//     setTimeout(latereply, 3000);
//    function latereply(){
//        send = {
//                'message':{
//                    'text': '검색 시간이 너무 오래 걸려요 :('
//                }
//        }
//        res.json(send);
//    }
    
    switch(msg){
        case '안녕':
//            clearTimeout(setTimeout(latereply,3000));
            send = {
                'message':{
                    'text': '안녕하세요'
                }
            }
            res.json(send);
            break;
        case '사과':
//            clearTimeout(setTimeout(latereply,3000));
            send = {
                'message':{
                    'text': '맛있다.'
                }
            }
            res.json(send);
            break;
        case '날씨':
//            clearTimeout(setTimeout(latereply,3000));
            weatherRss.weatherRes(200, function(values){ //Weather Crawling
                send = {
                   'message':{
                        'text': values
                    }
               }
                res.json(send);
            });
            break;
        case '안알려줄래요': //DB Not Using
//            clearTimeout(setTimeout(latereply,3000));
            send = {
                'message':{
                    'text' : '다음에는 알려주세요! :)'
                }
            }
            res.json(send);
            break;
        case '알려줄래요': //DB Using
//            clearTimeout(setTimeout(latereply,3000));
            send = {
                'message':{
                    'text' : '아직 준비가 안되었어요 :('
                }
            }
            res.json(send);
            break;
        default:
            searchRes.questRes(msg,function(values){ //Google Search
                if(values == 'ERROR'){
//                    clearTimeout(setTimeout(latereply,3000));
                    values = '가르쳐 주실래요?';
                    send = {
                        'message':{
                            'text': values
                        },
                        keyboard:{
                            'type':'buttons',
                                'buttons':['알려줄래요','안알려줄래요']
                        }
                    }
                    res.json(send);    
                }else{
//                    clearTimeout(setTimeout(latereply,3000));
                    send = {
                    'message':{
                        'text': values
                        }
                    }
                    res.json(send);    
                }
            });
            break;
    }
});

http.createServer(app).listen(9111, function(){
    console.log('실행중');
});