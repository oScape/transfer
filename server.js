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
    exec('gammu sendsms text '
        + req.body.phone
        + ' -text "'
        + req.body.message 
        + '"',
        function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
    res.end("yes");
});

app.listen( 8080, () => console.log("Serveur listening on: 8080"));