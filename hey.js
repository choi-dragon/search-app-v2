const express=require('express')
const app=express()
const path=require('path')
const port = process.env.PORT || 3000 
const hbs=require('hbs')
const request=require('request')
const viewsPath=path.join(__dirname)
const places=require('./places')
const geocode=require('./geocode')
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(viewsPath))
console.log(viewsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Search Place',
        name:'Yong Choi'
    })
})
app.get('/result',(req,res)=>{
    var queryParameter=req.query;
    // res.json(queryParameter)
    if(!queryParameter.address&& !queryParameter.searchPlace){
        return res.send({
            error:'You must provide the detail'
        })
    }
    // else if(!queryParameter.address||!queryParameter.searchPlace){
    //     return res.send({
    //         error:'You must provide the detail2'
    //     })
    // }
    geocode(queryParameter.address,(error,{ minLatitude, minLongitude, maxLatitude, maxLongitude }={})=>{
        if(error){
            return res.send({ error })
        }
        places(queryParameter.searchPlace,minLatitude, minLongitude, maxLatitude, maxLongitude,(error,PlaceSearch)=>{//callback function can be used within the callback function and let you use data from the other callback function. Need to watch out which parameters are used for which as parameter used for one callback function is extended to the callback function within. 
            if(error){
                return res.send({ error })
            }
            // for(i=0;i<PlaceSearch().length;i++){
            //     res.send({
            //         place:PlaceSearch()
            //     })
            // }
            res.render('result',{
                place:PlaceSearch()[0],
                place1:PlaceSearch()[1],
                place2:PlaceSearch()[2],
                place3:PlaceSearch()[3],
                place4:PlaceSearch()[4],
                place5:PlaceSearch()[5],
                place6:PlaceSearch()[6],
                place7:PlaceSearch()[7],
                place8:PlaceSearch()[8],
                place9:PlaceSearch()[9]
            })
            
        })
    })
})

app.listen(port,()=>{// this finally sets the server
    console.log('Server is up on port '+port)
})