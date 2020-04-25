const createCode = (length: number) => {
    let returnString = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let x = 0; x < length; x++){
        returnString += characters[Math.floor(Math.random() * characters.length - 1)]
    }
    return returnString;
}

module.exports = createCode;