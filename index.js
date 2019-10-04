const textToJSON = require('./textToJSON');
const { findPeoples } = require('calc_dist_geopoints');

let allPersons = new Promise(function(resolve,reject){
    textToJSON('./data.txt',function(err, persons){
        if(err){
            reject(err);
            return;
        }
        resolve(persons);
    });
});

allPersons.then(function(persons){
    let inRangePersons = findPeoples(persons,53.339428,-6.257664,100);
    console.log(inRangePersons);
},function(er){
    console.log("rejection",er)
}).catch(e=>{
    console.log("ex",e);
});
