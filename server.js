const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const {exec} = require('child_process');

let upload = multer();

app.use(express.static(path.join(__dirname + '/public')));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/post', upload.none(), (req, res) => {
    console.log(req.body);
    exec('gammu sendsms text '
        + req.body.phone
        + ' -text "'
        + req.body.message 
        + '"' );
    res.end("yes");
});

app.listen( 8080, () => console.log("Serveur listening on: 8080"));