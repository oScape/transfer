import { validation } from "./validation.js";

window.onload = () => {
    let button = document.getElementById('button');
    button.onclick = (e) => sendAjax(e);
};

function sendAjax(e) {
    let formValidation = validation(document.forms);

    if (formValidation && formValidation.validity) {
        let form = document.getElementById('form');
        let XHR = new XMLHttpRequest();
        let FD = new FormData(form);

        XHR.open('POST', 'http://localhost:8080/post', true);
        XHR.send(FD);
    }
    else if (formValidation) {
        alert(formValidation.message);
        e.preventDefault();
    }
    else {
        alert("Un problème serveur est survenu, veuillez me contacter :)");
        e.preventDefault();
    }
};