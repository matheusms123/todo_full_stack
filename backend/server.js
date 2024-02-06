const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")



const name = "lista"
const port = 3000

app.use(express.json())
app.use(cors())



const router = require("./routes/router")
app.use("/", router)

mongoose.connect(
    `mongodb://localhost/${name}`
)

app.listen(port, () => {
    console.log(`Está rodando na porta: ${port}`)
})