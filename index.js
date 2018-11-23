var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var app = express();
var api = "https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/";

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
        method: "POST",
        json: user
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

    request.get(api+`${id}`, function (error, response, body) {
        
        res.render('show', {
            user: JSON.parse(body)
        })
        console.log("Body" + body);
    });
});

app.get('/searchUser/:id', function(req, res) {
    var id = req.params.id;

    request.get(api+`${id}`, function (error, response, body) {
        
        res.render('show', {
            user: JSON.parse(body)
        })
        console.log("Body" + body);
    });
});

app.get('/update/:id', function (req, res) {
    var id = req.params.id;

    request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/' + id, function (error, response, body) {
        res.render('update', {
            user: JSON.parse(body)
        })
    })
});

app.post('/update', function (req, res) {
    
    var user = {
        "name" : req.body.name,
        "email" : req.body.email,
        "gender" : req.body.gender,
        "phone" : req.body.phone
    }

    request.put({
        url: api + `${req.body.id}`,
        method: "POST",
        json: user
    },

    function (error, response, body){
        res.redirect('/searchUser/' + req.body.id)
    });
    
});

app.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    request.delete({
        url: api + id,
        method: "POST",
        json: id
    }, 
    
    function (error, response, body) {
        res.redirect('/list')
    })
});

app.listen(3030, function() {
    console.log('Running on the port 3030');
});