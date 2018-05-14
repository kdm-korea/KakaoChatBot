//express, https Module use
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

//weather Module use
var weatherRss = require('./Weather.js');

var app = express();

//body-parser Middleware use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/keyboard', function(req, res){
    //send data
   
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
         default:
            send = {
                'message':{
                    'text' : '아직 준비가 안되었어요 :('
                }
            }
            res.json(send);
            break;
        }
    //json syntex res
    res.json(data);
});

app.post('/message', function(req, res){
    //Client Write Msg
    var msg = req.body.content;
    //Res Message
    var send = {};
    
    send = {
                'message':{
                    'text' : '아직 준비가 안되었어요 :('
                }
            }
            res.json(send);
});


http.createServer(app).listen(9111, function(){
    console.log('실행중');
});