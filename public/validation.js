export const validation = ( form ) => 
{
    let name = form["form"]["name"];
    let phone = form["form"]["phone"];

    let result = Object.create(ValidationInterface);

    if (name.value === "")
    {
        result = {validity: false, message: "Insert name"};
        return result;
    }

    if (phone.value.length < 10)
    {
        result = {validity: false, message: "Bad phone number"};
        return result;
    }

    return result;
}

const ValidationInterface = {
    validity: true,
    message: ""
};