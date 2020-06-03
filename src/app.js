const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define path express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location //app.set(name, value)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayush das'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ayush das'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'How can i help you?',
        title: 'Help',
        name: 'Ayush das'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide the search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//.......another way of above........
// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         res.send({
//             error: 'you must provide the search term'
//         })
//     } else {
//         console.log(req.query.search)
//         res.send({
//             products: []
//         })
//     }
// })

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'No address given'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error) {
            return res.send({ error }) 
        }
        forecast( latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,

                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'it is raining',
    //     location: 'Delhi'
    // })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ayush Das',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ayush Das',
        errorMessage: 'Page not found'
    })
})

// app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('server is up on port 3000')
})