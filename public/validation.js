export const validation = (form) => {
    const NAME = form["form"]["name"];
    const PHONE = form["form"]["phone"];

    let result = Object.create(ValidationInterface);

    if (!regexString.test(NAME.value) || NAME.value.length <= 0) {
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
}

const regexString = RegExp(/^[A-Za-z]+$/);

const ValidationInterface = {
    validity: true,
    message: ""
};