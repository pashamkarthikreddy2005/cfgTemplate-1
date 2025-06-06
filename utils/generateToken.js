const jwt=require('jsonwebtoken')

const generateToken = (email,id)=>{
    let token=jwt.sign({email,id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
    return token;
}


module.exports=generateToken;
