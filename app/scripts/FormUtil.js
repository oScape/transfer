export function submit(e, form) {
    let formValidation = validation(form);

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

function validation(form) {
    const NAME = form["name"];
    const PHONE = form["phone"];

    let result = {
        validity: true,
        message: ""
    };

    if (!RegExp(/^[A-Za-z]+$/).test(NAME.value) || NAME.value.length <= 0) {
        result.validity = false;
        result.message = "Veuillez insérer un nom";
    }

    if (isNaN(parseInt(PHONE.value)) || PHONE.value.length !== 10) {
        result.validity = false;
        if (result.message === "") {
            result.message = "Le numéro de téléphone est incorrect";
        }
        else {
            result.message = result.message + " et un numéro de téléphone correct";
        }
    }

    return result;
};