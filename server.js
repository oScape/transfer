const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
var sys = require('sys')
const {exec} = require('child_process');

let upload = multer();

app.use(express.static(path.join(__dirname + '/public')));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/post', upload.none(), (req, res) => {
    let arrayString = [req.body];
    if( req.body.message.length > 160 )
    {
        arrayString = sliceString(req.body.message);
    }
    // exec('gammu sendsms text '
    //     + req.body.phone
    //     + ' -text "'
    //     + req.body.message 
    //     + '"',
    //     function (error, stdout, stderr) {
    //         sys.print('stdout: ' + stdout);
    //         sys.print('stderr: ' + stderr);
    //         if (error !== null) {
    //             console.log('exec error: ' + error);
    //         }
    //     }
    // );
    console.log( arrayString )
    res.end("yes");
});

app.listen( 8080, () => console.log("Serveur listening on: 8080"));

let sliceString = (string) => {
    let arrayString = [];
    let maxI = string.length;
    for(let i = 0; maxI > i; i += 160)
    {
        let a = i + 160;
        if ( maxI < a )
        {
            a = maxI;
        }
        arrayString.push(string.slice(i, a))
    }
    return arrayString;
}