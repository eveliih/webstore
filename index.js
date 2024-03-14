const express = require('express')
const app = express()



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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/fruits/:id', (request, response) => {
  const id = Number(request.params.id)
  const fruit = fruits.find(fruit => fruit.id === id)
  response.json(fruit)
})

app.delete('/api/fruits/:id', (request, response) => {
  const id = Number(request.params.id)
  fruits = fruits.filter(fruit => fruit.id !== id)

  response.status(204).end()
})

app.get('/api/fruits', (request, response) => {
  response.json(fruits)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})