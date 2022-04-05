import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
})
