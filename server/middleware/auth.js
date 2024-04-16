const jwt = require("jsonwebtoken");

exports.require_auth =async (req,res,next)=>{
    console.log(true);
    const token = req.cookies.jwt

    console.log('token =>',token);
    next();
}