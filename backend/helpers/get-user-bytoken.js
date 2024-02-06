const jwt = require("jsonwebtoken")
const User = require("../model/user")

const getUserByToken = async (token) => {
  
    
    if(!token) {
        return res.status(400).json({ error: "Acesso negado"})
    }

    const decoded = await jwt.verify(token, "segredo")

    const userId = await decoded.id

    const user = await User.findOne({ _id: userId})

    return user
}

module.exports = getUserByToken