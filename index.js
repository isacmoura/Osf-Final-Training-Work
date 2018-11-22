var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var api = 'https://cryptic-retreat-41638.herokuapp.com/api/contacts';

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/list', function (req, res) {
    request.get(api, function (error, response, body) {
        console.log(body)
        res.render('list', {
            contacts: JSON.parse(body)
        });
    });
});

app.get('/register', function (req, res) {
    
});

app.listen(3030, function() {
    console.log('Running on the port 3030');
});