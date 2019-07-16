var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

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
    res.end(sendMessage(req));
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
    let message = [req.body.message];
    if (req.body.message.length > 160) {
        message = dataUtil.sliceString(req.body.message);
    }

    for (let i = 0; message.length > i; i++) {
        exec(
            "gammu sendsms text " +
            req.body.phone +
            ' -text "' +
            message[i] +
            '"',
            function (error, stdout, stderr) {
                errorLogger(error, stdout, stderr);
            }
        );
    }
}

/**
 * Traitement et log des erreurs dans le fichier approprié
 */
function errorLogger(error, stdout, stderr) {
    let data = `stdout: ${stdout}\n`;
    if (stderr) {
        data = `stderr: ${stderr}\n`;
    }
    if (error) {
        data = error;
    }
    data = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '') + " - " + data;

    fs.writeFileSync(path.join(__dirname + '/log.txt'), data, { flag: "a" }, (err) => console.log(err));
}