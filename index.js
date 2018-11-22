var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var app = express();
var api = 'https://cryptic-retreat-41638.herokuapp.com/api/contacts';

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


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
    res.render('register');
});



app.post('/register', function (req, res) {
    var user = {
        "name" : req.body.name,
        "email" : req.body.email,
        "gender" : req.body.gender,
        "phone" : req.body.phone
    };

    request.post({
        url: api, 
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: require('querystring').stringify(user)
    },

    function (error, response, body) {
        res.redirect('list');
        console.log(body);
    });


});

app.get('/search', function(req, res) {
    res.render('search');
});

app.get('/searchUser', function(req, res) {
    var id = req.query.id;

    request.get(`https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/${id}`, function (error, response, body) {
        
        res.render('show', {
            user: JSON.parse(body)
        });
        console.log("Body" + body);
    });
});

app.listen(3030, function() {
    console.log('Running on the port 3030');
});