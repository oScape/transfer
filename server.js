var express = require('express');
var multer = require('multer');
var path = require('path');
var sys = require('sys');

var { exec } = require('child_process');
var dataUtil = require('./util/data.js');

var app = express();
var upload = multer();

/**
 * Mise à disposition du file app
 */
app.use(express.static(path.join(__dirname + '/dist')));

/**
 * Route principal
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

/**
 * Route de soumission du formulaire
 */
app.post('/post', upload.none(), (req, res) => {
    sendMessage(req);
    res.end('yes');
});

/**
 * Listener du serveur
 */
app.listen(8080, () => console.log('Serveur listening on: 8080'));

/**
 * Traitement et envoi du message
 * @param {Request} req
 */
function sendMessage(req) {
    let arrayString = [req.body];
    if (req.body.message.length > 160) {
        arrayString = dataUtil.sliceString(req.body.message);
    }
    for (let i = 0; arrayString.length > i; i++) {
        exec(
            "gammu sendsms text " +
            req.body.phone +
            ' -text "' +
            arrayString[i] +
            '"',
            function (error, stdout, stderr) {
                sys.print("stdout: " + stdout);
                sys.print("stderr: " + stderr);
                if (error !== null) {
                    console.log("exec error: " + error);
                }
            }
        );
    }
}
