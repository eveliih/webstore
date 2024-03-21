const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

const { PORT } = require('./util/config')

const { connectToDatabase } = require('./util/db')

const productsRouter = require('./controllers/products')

app.use(express.json())

app.use('/api/fruits', productsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

/*
const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const product1 = await sequelize.query("SELECT * FROM products WHERE Product_Id = 1", { type: QueryTypes.SELECT })
    const image = await sequelize.query("SELECT * FROM Images WHERE Product_Id = 1", { type: QueryTypes.SELECT })
    console.log(product1, image)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()*/