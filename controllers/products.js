const router = require('express').Router()

const { Product, Image } = require('../models')

router.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: Image,
      attributes: {exclude: ['productId']}
    }
  })
  res.json(products)
})


router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = product.find(product => product.id === id)
  response.json(product)
})

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id)
  if (product) {
    await product.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id)
  if (product) {
    product.important = req.body.important
    await product.save()
    res.json(product)
  } else {
    res.status(404).end()
  }
})

module.exports = router