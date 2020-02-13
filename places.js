const request = require('request')
const places=(search,minLatitude,minLongitude,maxLatitude,maxLongitude,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+search+'.json?bbox='+minLongitude+','+minLatitude+','+maxLongitude+','+maxLatitude+'&access_token=pk.eyJ1IjoidG1kZHlkY2hsIiwiYSI6ImNrNW4xajJtczE1cnYzbXF5dTJ5eGp5OHYifQ.g84Puk_JuhS_iKSKBdXXLw&limit=10'
    request({url,json:true},(error,{ body }={})=>{
        if(error){
            callback('No internet connection',undefined)
        }else if(body.features.length===0){
            callback('No matching result',undefined)
        }else{
            callback(undefined,
            ()=>{
                var jsonArr=[]
                for(i=0;i<body.features.length;i++){
                    jsonArr.push(body.features[i].place_name)
            }
            return jsonArr
            }
            )
        }
    })
}
module.exports=places