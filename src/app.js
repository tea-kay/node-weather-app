const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlehars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tim Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tim Kim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the message',
        title: 'Help',
        name: 'Tim Kim'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'You must provie an address.'
        })
    }
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            return res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        name: 'Tim Kim'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Tim Kim'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})