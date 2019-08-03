const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ291cmRlZXBhayIsImEiOiJjanllMXE2NXMwd3JmM2dzNWIxOGlncHNhIn0.JXt-3RoeOqL7SPsL1Dk65A&limit=1'

    request({url, json: true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to local services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another searches.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode