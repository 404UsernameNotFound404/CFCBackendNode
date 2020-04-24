const createCode = async (length: number) => {
    let returnString = "";
    for (let x = 0; x < length; x++){ 
        returnString +=  String.fromCharCode(Math.floor(Math.random() * 93) + 33);
    }
    return returnString;
}

export default createCode;