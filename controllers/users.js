const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
 

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
    return response.status(400).json({ error })
  }

})    

module.exports = usersRouter