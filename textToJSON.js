const fs = require('fs');
const readline = require('readline');

function textToJSON(filePath,callback){
    let persons = [];
    fs.stat(filePath,function(err, stats){
        
        if(callback == undefined || typeof callback != "function"){
            return ;
        }

        if(err){
            callback("file Not found");
            return;
        }

        var rd = readline.createInterface({
            input: fs.createReadStream(filePath),
            console: false
        });

        rd.on('line', function(line){
            try{
                let person = JSON.parse(line);
                persons.push(person);
            }catch(e){
                callback(e);
                rd.removeAllListeners();
                rd.close();
            }
            
        });

        rd.on('close',function(){
            callback(null, persons);
        });

    });
}

module.exports = textToJSON;