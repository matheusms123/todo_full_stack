const jwt = require("jsonwebtoken")
const User = require("../model/user")
const Task = require("../model/task")
const getUserByToken = require("../helpers/get-user-bytoken")


const taskController = {
    create: async (req, res) => {

        const title = req.body.title
        const description = req.body.description
        

        const token = req.header("auth-token")
        const userToken = await getUserByToken(token)
        const userId = userToken._id.toString()





        const tasks = new Task({
            title: title,
            description: description,
            complete: req.body.complete,
            userId: userId
        })

        try {

            const task = await tasks.save()

            res.json({ error: null, msg: "Task adicionada com sucesso!", data: task })

        } catch (error) {

            return res.status(400).json({ error: `Algo deu errado: ${error}` })

        }
    },

    getAll: async (req, res) => {


        try {
            const token = req.header("auth-token")
            const userToken = await getUserByToken(token)
            const userId = userToken._id.toString()

            const task = await Task.find({ userId: userId })

            res.json({ error: null, task})


        } catch (error) {
            return res.status(400).json({ error: `Algo deu errado: ${error}` })
        }

    },
    get: async (req, res) => {
        const id = req.params.id

         const token = req.header("auth-token")
         const userToken = await getUserByToken(token)
         const userId = userToken._id.toString()

         const task = await Task.findOne({ _id: id, userId: userId })

         try {
            
            res.json({ error: null, task})

         } catch (error) {
            
            return res.status(400).json({ error: `Algo deu errado: ${error}`})

         }

    },

    update: async(req, res) => {
        const id = req.params.id

        const token = req.header("auth-token")

        const userToken = await getUserByToken(token)

        const userId = userToken._id.toString()

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            complete: req.body.complete

        }

        
        const task = await Task.findByIdAndUpdate({_id: id, userId: userId}, {$set: updateData}, {new: true })
        if(task.userId != userId ) {
            return res.status(400).josn({ error: `Acesso negado!`})
        }

        try {
            res.json({ error: null, msg: "Task atualizada com sucesso!", task})
        } catch (error) {
            
        }

    },

    delete: async(req, res) => {
        const id = req.params.id

        const token = req.header("auth-token")

        const userToken = await getUserByToken(token)

        const userId = userToken._id.toString()

        const task = await Task.findByIdAndDelete({_id: id, userId: userId})

        try {
            
            res.json({ error: null, msg: `Task deletada com sucesso!` })

        } catch (error) {

            return res.status(400).json({ error: `Algo deu errado: ${error}`})
            
        }
    }

}

module.exports = taskController