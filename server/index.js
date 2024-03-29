import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRouter from './routes/users.js'
import path from 'path'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRouter)

// app.get('/', (req, res) => {
//   res.send('APP IS RUNNING')
// })

// const CONNECTION_URL =
//   'mongodb+srv://dujanaaziz:DV8SuAtzHY5h8VtP@cluster0.sjisdqe.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`))

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
