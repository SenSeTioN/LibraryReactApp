const cors = require('cors')
const express = require('express')
const booksData = require('../data/books.json')

const app = express()

app.use(cors())

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length)
  const randomBook = booksData[randomIndex]

  return randomBook
}

app.get('/random-book', (req, res) => {
  res.json(getRandomBook())
})

app.get('/random-book-delayed', (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook())
  }, 600)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
