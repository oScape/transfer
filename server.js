const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const sys = require('sys');
const { exec } = require('child_process');
const dataUtil = require('./util/data.js');

let upload = multer();

// public file
app.use(express.static(path.join(__dirname + '/public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// post form
app.post('/post', upload.none(), (req, res) => {
    let arrayString = [req.body];
    if (req.body.message.length > 160) {
        arrayString = dataUtil.sliceString(req.body.message);
    }
    for (let i = 0; arrayString.length > i; i++) {
        exec('gammu sendsms text '
            + req.body.phone
            + ' -text "'
            + arrayString[i]
            + '"',
            function (error, stdout, stderr) {
                sys.print('stdout: ' + stdout);
                sys.print('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            }
        );
    }
    res.end("yes");
});

// listener server
app.listen(8080, () => console.log("Serveur listening on: 8080"));