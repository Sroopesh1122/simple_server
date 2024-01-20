const jwt = require('jsonwebtoken')

const generateToken = async (id)=>{

    return await jwt.sign({id},process.env.TOKEN_SECRET_KEY,{expiresIn:"2d"})

}

module.exports={generateToken}