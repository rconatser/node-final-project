const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, 'uploads/test.png');

const app = express();
const port = 8080;

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (error) return console.error(error);

        fs.unlinkSync(imagePath);
        fs.renameSync(files.upload.path, imagePath);

        const data = `${ Object.keys(fields).map(key => `${ key }: ${ fields[key] }`)}`;

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Form Response</title>
            <link rel="stylesheet" href="styles.css" />
        </head>
        <body class="home">
           <div class="container">
             <h1>Your Form Input Data</h1>
             <h2>Your Image</h2>
             <img src="/show" />
             <h2>Received Data</h2>
            <p>${ data }</p>
            </div>
        </body>
        </html>`);
    });
});

app.get('/show', (req, res) => {
    console.log('Request handler "show" was called.');
    res.sendFile(imagePath);
});

app.listen(port, () => console.log(`Server Started on ${port}`));