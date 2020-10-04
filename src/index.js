const express = require('express');
const hbs = require('hbs');
const path = require('path');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Thearith'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide address to fetch the weather'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Thearith'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Thearith'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        name: 'Thearith'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Thearith'
    })
});


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is up on port ${port}.`));