const request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/520181ab90fdb59f373d54ea103709ed/'+latitude+','+longitude

    request({ url, json: true }, (error, { body })=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' It is currently '+((body.currently.temperature - 32)*(5/9)).toFixed(1)+' degrees celsius out. There is a '+body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast 