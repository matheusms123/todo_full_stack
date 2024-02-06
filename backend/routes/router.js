const router = require("express").Router()


const userRouter = require("./userRouter")
router.use('/user', userRouter)

const taskController = require("./taskRouter")
router.use('/task', taskController)

module.exports = router