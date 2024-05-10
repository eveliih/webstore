const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')
const Sequelize = require('sequelize')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
 
  const passwordRegex = /^.{8,}$/
if (!passwordRegex.test(password) ||
    !/[a-zäöå]/.test(password) ||
    !/[A-ZÄÖÅ]/.test(password) ||
    !/\d/.test(password) ||
    !/[^\w\s]/.test(password)) {
  return response.status(400).json({ error: 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.' })
}

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try{
    const user = await User.create({
      username,
      name,
      passwordHash
    })
    return response.status(201).json(user)
  }catch(error){
    if (error instanceof Sequelize.UniqueConstraintError) {
      return response.status(400).json({ error: 'Username must be unique.' })
    }
    return response.status(400).json({ error: error.message })
  }

})    

module.exports = usersRouter