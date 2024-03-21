const router = require('express').Router()

const { Image } = require('../models')

router.get('/', async (req, res) => {
  const images = await Image.findAll()
  res.json(images)
})


router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const image = image.find(image => image.id === id)
  response.json(image)
})

router.post('/', async (req, res) => {
  try {
    const image = await Image.create(req.body)
    res.json(image)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const image = await image.findByPk(req.params.id)
  if (image) {
    res.json(image)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const image = await image.findByPk(req.params.id)
  if (image) {
    await image.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const image = await image.findByPk(req.params.id)
  if (image) {
    image.important = req.body.important
    await image.save()
    res.json(image)
  } else {
    res.status(404).end()
  }
})

module.exports = router