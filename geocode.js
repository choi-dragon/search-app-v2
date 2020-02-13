const request=require('request')
const geocode=(address,callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoidG1kZHlkY2hsIiwiYSI6ImNrNW4xajJtczE1cnYzbXF5dTJ5eGp5OHYifQ.g84Puk_JuhS_iKSKBdXXLw&limit=1'
    request({url,json:true},(error, { body }={})=>{
        if(error){
            callback('No internet connection',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                minLatitude:body.features[0].bbox[1],
                minLongitude:body.features[0].bbox[0],
                maxLatitude:body.features[0].bbox[3],
                maxLongitude:body.features[0].bbox[2]
            })
        }
    }
    )
}
module.exports=geocode