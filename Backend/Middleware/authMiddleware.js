const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler")
const User = require('../Models/userModel');

const protect = asyncHandler(async (req,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token =  req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded = jwt.verify(token, process.env.SECRET_MSG);

            req.user = await User.findById(decoded.id).select("-password")
            //select("-password") -- return without password
            next();
        }catch(e) {
res.status(401);
throw new Error("Not Authorized, token failed");
    }
        
    }
    if(!token){
     res.status(401);
throw new Error("Not Authorized, No token ");   
    }
})

module.exports = {protect}