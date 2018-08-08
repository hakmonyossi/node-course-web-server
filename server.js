const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}` ;

    console.log(log);
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs' , {
        pageTitle: '404 maintenance',
        //currentYear: new Date().getFullYear()
    });
});

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello Express</h1>');
//     res.send({
//         name: 'Yossi',
//         loves: [
//             'skateboard',
//             'Movies'
//         ]
//     });
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('homepage.hbs' , {
        pageTitle: 'Homepage',
        //currentYear: new Date().getFullYear(),
        welcomeMSG: 'Welcome to my homepage'
    });
});

app.get('/about', (req, res) => {
    res.render('About.hbs' , {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 'Bad request',
        errorMssage: [
            'unable to fulfil the request',
            'We sorry about it'
        ]
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});;exports.__dirname = __dirname;
