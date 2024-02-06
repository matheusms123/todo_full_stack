const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        require: true
    },
    userId: {
        type: mongoose.ObjectId,
        require: true
    }
})

const Task = mongoose.model("Task", taskSchema)


module.exports = Task