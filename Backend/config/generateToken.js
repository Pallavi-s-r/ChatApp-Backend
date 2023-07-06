const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const generateToken = (id) =>{
    return jwt.sign({id},process.env.SECRET_MSG,{
        expiresIn:"30d"
    
    })
}
module.exports= generateToken