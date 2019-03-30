window.onload = () => {

    let form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.setAttribute('enctype', 'multipart/form-data');

    let nameContainer = document.createElement('div');
    nameContainer.setAttribute('id', 'nameContainer');
    
    let inputName = document.createElement('input');
    inputName.setAttribute('name', 'name');
    inputName.setAttribute('id', 'name');

    let labelName = document.createElement('label');
    labelName.setAttribute('for', 'name');
    labelName.innerText = "Nom :";

    let phoneContainer = document.createElement('div');
    phoneContainer.setAttribute('id', 'phoneContainer');

    let inputPhone = document.createElement('input');
    inputPhone.setAttribute('name', 'phone');
    inputPhone.setAttribute('id', 'phone');

    let labelPhone = document.createElement('label');
    labelPhone.setAttribute('for', 'phone');
    labelPhone.innerText = "Téléphone :";

    let messageContainer = document.createElement('div');
    messageContainer.setAttribute('id', 'messageContainer');

    let inputMessage = document.createElement('textarea');
    inputMessage.setAttribute('name', 'message');
    inputMessage.setAttribute('id', 'message');

    let labelMessage = document.createElement('label');
    labelMessage.setAttribute('for', 'message');
    labelMessage.innerText = "Message :";
    
    let button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Valider');
    button.onclick = () => sendAjax();

    nameContainer.appendChild(labelName);
    nameContainer.appendChild(inputName);
    form.appendChild(nameContainer);

    phoneContainer.appendChild(labelPhone);
    phoneContainer.appendChild(inputPhone);
    form.appendChild(phoneContainer);
    
    messageContainer.appendChild(labelMessage);
    messageContainer.appendChild(inputMessage);
    form.appendChild(messageContainer);

    form.appendChild(button);

    document.getElementById('root').appendChild(form);
};

let sendAjax = () => {
    let name = document.forms["form"]["name"];
    let phone = document.forms["form"]["phone"];

    if (name.value === "")
    {
        alert("Insert name");
        return false;
    }

    if (phone.value.length < 10)
    {
        alert("Bad phone number");
        return false;
    }
    
    let form = document.getElementById('form');
    let XHR = new XMLHttpRequest();
    let FD = new FormData(form);

    XHR.open('POST', 'http://localhost:8080/post', true);
    XHR.send(FD);
};