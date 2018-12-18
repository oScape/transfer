const fs = require('fs');

let reader = new Promise(function (resolve, reject) {
    fs.readFile('./external/hello.txt', 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
    });
});

let parser = data => {
    return data.split('\n')
        // on enlève le retour chariot
        .map(line => line.replace('\r', ''))
        // on split entre chaque element
        .map(line => line.split(': '));
};

let writer = (fileName, data) => fs.writeFile('./internal/' + fileName + '.json', JSON.stringify(data), err => {
    if (err) {
        throw err;
    }
    console.log('The file has been save.');
});

let manager = () => {
    // extraction de la donnée depuis un fichier
    reader.then(d => {
        // parsing la donnée extraite
        let data = parser(d);
        // intégration de la donnée dans un objet json
        let json = {};
        data.map(line => json[line[0]] = line[1]);
        // création d'un fichier de donnée
        writer(json.Date.replace(/[^0-9\.]+/g, "") + json.Chauffeur, data)
    }).catch(err => {
        throw err;
    });
};

manager();