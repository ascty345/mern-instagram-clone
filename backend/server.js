import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

const app = express()

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
