const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static('public'));

app.get('/', function(req, res) { 
    res.send('Hello World!'); 
});

app.route('/endpoint') 
    .get(function(req, res, next) {
        res.sendFile(path.join(__dirname, 'public\hello.html'));
        next();
})
    .post(function(req, res) {
        console.log('I did get a POST request');
        res.send('Hello from post');
    });

app.listen(port, function() { 
    console.log(`Example app listening on port ${port}!`);
}); // back tick allows us to utilize js variables
