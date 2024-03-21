const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const { PORT } = require('./util/config')

const { connectToDatabase } = require('./util/db')

const productsRouter = require('./controllers/products')
const imagesRouter = require('./controllers/images')


app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/images', imagesRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
