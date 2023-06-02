import express from "express"
import cors from "cors"
import "dotenv/config"
import todo from "./routes/todo.js"

const app = express()

const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use("/todo", todo)

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
})