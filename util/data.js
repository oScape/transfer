function sliceString(string) {
    let arrayString = [];
    let maxI = string.length;
    for (let i = 0; maxI > i; i += 160) {
        let a = i + 160;
        if (maxI < a) {
            a = maxI;
        }
        arrayString.push(string.slice(i, a))
    }
    return arrayString;
}

module.exports = {
    sliceString
}