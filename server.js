var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var { execSync } = require('child_process');
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
    let hasError = sendMessage(req);
    res.status(hasError ? 500 : 200).end();
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
    let hasError;
    if (req.body.message.length > 160) {
        message = dataUtil.sliceString(req.body.message);
    }

    for (let trunk of message) {
        execSync(
            "gammu sendsms text " +
            req.body.phone +
            ' -text "' +
            trunk +
            '"',
            (error, stdout, stderr) => {
                logger(error, stdout, stderr);
                hasError = !!(error || stderr);
            }
        );
    }

    saveMessage(req.body);
    return hasError;
}

/**
 * Enregistrement du message
 */
function saveMessage(bodyMessage) {
    let fileName = new Date().toLocaleDateString().replace(/\//g, '_');
    let data = '-------------- Message --------------\n'
    + `name: ${bodyMessage.name}\n`
    + `phone: ${bodyMessage.phone}\n`
    + `message: ${bodyMessage.message}\n`;

    let dataDirectory = path.join(__dirname + '/data/');
    if (!fs.existsSync(dataDirectory)){
        fs.mkdirSync(dataDirectory);
    }
    fs.writeFileSync(dataDirectory + fileName + '.txt', data, { flag: "a" });
}

/**
 * Traitement et log des erreurs dans le fichier approprié
 */
function logger(error, stdout, stderr) {
    let data = `stdout: ${stdout}\n`;
    if (stderr) {
        data = `stderr: ${stderr}\n`;
    }
    if (error) {
        data = error;
    }
    data = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '') + " - " + data;

    fs.writeFileSync(path.join(__dirname + '/logs.log'), data, { flag: "a" });
}