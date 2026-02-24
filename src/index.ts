import express from 'express'
import dotenv from 'dotenv'
import connectDB from './configs/db'
import { errorHandler } from './middlewares/errorHandler'
import { notFoundHandler } from './middlewares/notFoundHandler'
import userRoute from './routes/userRoute'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())


const port = process.env.PORT ?? 3000

app.use('/users', userRoute)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server running on 0.0.0.0:${port}`)
})
