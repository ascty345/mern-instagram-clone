import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
})
