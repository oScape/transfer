const fs = require('fs');

fs.readFile('./external/hello.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    // création du container json
    let json = {};
    // split par ligne
    data.split('\n')
        // on enlève le retour chariot
        .map(line => line.replace('\r', ''))
        // on split entre chaque element
        .map(line => line.split(': '))
        // on l'intègre dans notre objet json
        .map(line => json[line[0]] = line[1]);
    // création du nom de fichier
    let fileName = json.Date.replace(/[^0-9\.]+/g, "") + json.Chauffeur;
    // création du fichier json
    fs.writeFile('./internal/' + fileName + '.json', JSON.stringify(json), err => {
        if (err) {
            throw err;
        }
        console.log('The file has been save.');
    });
});