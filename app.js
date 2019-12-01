const express = require('express');
const app = express();
const port = 8080;

app.get('/', function(req, res) { res.send('Page Loaded Unsuccessfully.') });
app.listen(port, function() { console.log(`Example app listening on port ${port}!`) }); // back tick allows us to utilize js variables
