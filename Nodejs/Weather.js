var RSS = "http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";

//module load
var parseString = require('xml2js').parseString;
var request = require('request');

//Rss download
exports.weatherRes = function all(area, callback){
    request(RSS, function(err, response, body){
        if(!err && response.statusCode == area){
            //xml Change Js Obj function
            analyzeRSS(body,function(datas){
                callback(datas);
            });
        }
    });
}

//rss 해석
function analyzeRSS(xml, callback){
    //xml Change Js Obj
    parseString(xml, function(err, obj){
        if(err) {console.log(err); return;}

        //weather Infomation Print
        var info = obj.rss.channel[0].item[0].description[0].header[0];
        var infoTitle = obj.rss.channel[0].item[0];
        callback('[ ' + infoTitle.title + ' ]\n' + info.wf.toString());
    });
}
