import express from 'express'
import dotenv from 'dotenv'
import connectDB from './configs/db'
dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server running on 0.0.0.0:${port}`)
})