const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: "Deepak Gour"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name: "Deepak Gour"    
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: "This is a helpful text",
        title: 'Help',
        name: 'Deepak Gour'
        
    })
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    //console.log(req.query.search)
    geocode(req.query.address, (error, {latitude, longitude, location} = {} )=>{
        if(error){
            return res.send({ error })
        }
        //callback chaining
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                
                forecast: forecastData,
                location,
                address: req.query.address
            })
    })
})
})


app.get('/products', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    console.log(req.query.address)
    res.send({
        forecast: 'It is sunny',
        location: 'Indore',
        address: req.query.address
    })
})


//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Deepak',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Deepak',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on the port 3000')
})