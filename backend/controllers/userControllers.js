const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/user")


const userController = {
    create: async (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        if(name == null || email == null || password == null || confirmpassword == null ) {
            return res.status(400).json({ error: "Preencha os campos nescessarios!" })
        }

        if( password != confirmpassword ) {
            return res.status(400).json({ error: "As senhas não conferem!" })
        }

        const userExist = await User.findOne({ email: email })

        if( userExist ) {
            return res.status(400).json({ error: "Este usuario já está cadastrado!" })
        }

        const salt = await bcrypt.genSalt(12)
        const passHah = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            password: passHah
        })

        try {
            
            const newUser = await user.save()

            const token = jwt.sign(
                {
                    name: newUser.name,
                    id: newUser._id
                },
                'segredo'
            )

            res.json({ error: null,msg: "Usuario cadastrado com sucesso!", token: token, userId: newUser._id })

        } catch (error) {
            return res.status(400).json({ error: `Algo deu errado: ${error}` })
        }

    },
    login: async (req,res) => {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ email: email })

        if(!user) {
            return res.status(400).json({ error: "Usuario não encontrado!" })
        }

        const checkpass = await bcrypt.compare(password, user.password)

        if(!checkpass ) {
            return res.status(400).json({ error: "Usuario ou senha Invalidos!" })
        }

        try {
            
            const token = jwt.sign(
                {
                    name: user.name,
                    id: user._id
                }, 
                'segredo'
            )

            res.json({ error: null, msg: "Autenticado!", token: token, userId: user._id })

        } catch (error) {
            return res.status(400).json({ error: `algo deu errado: ${error}`})
        }
    }
}

module.exports = userController