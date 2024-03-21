const router = require('express').Router()

const { Product } = require('../models')
/*
router.get('/', async (req, res) => {
  const products = await Product.findAll()
  res.json(products)
})
*/


let fruits = [
  {
    id: 1,
    name: "Banana",
    url: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: "15.9/kg"
  },
  {
    id: 2,
    name: "Orange",
    url: "https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "13/kg"

  },
  {
    id: 3,
    name: "Avocado",
    url: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "20/kg"

  }
]

router.get('/', async (request, response) => {
  try {
      const products = await Product.findAll();
  console.log(products)
  } catch (error) {
    console.log(error.message);
  }

  response.json(fruits)
})

router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const fruit = fruits.find(fruit => fruit.id === id)
  response.json(fruit)
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