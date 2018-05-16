exports.questRes = function(text,callback){
    var openApiURL = 'http://aiopen.etri.re.kr:8000/WiseQAnal';
    var access_key = 'accb1e07-ed73-4eb0-9f1f-7b39da8d0ab0';

    setTimeout(latereply, 1500);
    console.log("1");
    function latereply(){
        callback('검색 시간이 너무 오래 걸려요 :(');
        console.log("2");
    }
    
    var requestJson = {
        'access_key': access_key,
        'argument': {
            'text': text
        }
    };
    
    var request = require('request');
    var options = {
        url: openApiURL,
        body: JSON.stringify(requestJson),
        headers: {'Content-Type':'application/json; charset=UTF-8'}
    };

    request.post(options, function (err, response, body) {
        try{
            var acccountObj = JSON.parse(body);
            var value = acccountObj.return_object.orgQInfo.orgQUnit.vTitles[0].vEntityInfo[0].strExplain;
            callback(value);
            
        }catch (e){
            callback("ERROR");
        }

    }); 
};

