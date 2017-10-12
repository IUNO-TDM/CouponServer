var fs = require('fs');
var parse = require('csv-parse');

var request = require('request');

var csvData=[];
fs.createReadStream(process.argv[2])
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push({'key':csvrow[1],'value':csvrow[2].split(" ")[0]});
    })
    .on('end',function() {
        //do something wiht csvData
        console.log(csvData);
        var options = {
                method: 'POST',
                url: 'http://localhost:3010/addCouponKeys',
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body:csvData};

                
        request(options,function (e,r,data) {
            if(e){
                console.error(e);
            }else{
                console.log(e);
            }
        })

    });