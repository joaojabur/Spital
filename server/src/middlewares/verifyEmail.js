const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/authConfig.json");

module.exports = (token) => {
    const { id }  = verify(token, authConfig.secret);
    
    return id;
}