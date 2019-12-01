const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, '/uploads/test.png');

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
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
            <link rel="stylesheet" type="text/css" href="styles.css">
            <title>Final Project | Web Languages II</title>
            <nav>
                <img src="images/logo.jpg" alt="logo" />
                <a href="#contact">Contact</a>
            </nav>
        </head>
        
        <body>
            <div class="header">
                <div class="container">
                    <h1>Submission Verification</h1>
                    <p>Here are your responses</p>
                </div>
            </div>
            <div class="section response">
                <h2>Your Response</h2>
                <h3>Your Name:</h3>
                <p>${data}</p>

                <h3>Your Image:</h3>
                <img src="/show" alt="Uploaded image" />               
            </div>
            <footer>
                &copy; 2019 Rachel Conatser | DGM 3760 | Final Project
            </footer>
        </body>
        
        </html>`);
    });
});

app.get('/show', (res) => {
    console.log('Request handler "show" was called.');
    res.sendFile(imagePath);
});

app.listen(port, () => console.log(`Server Started on ${port}`));