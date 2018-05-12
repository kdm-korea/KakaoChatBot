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
