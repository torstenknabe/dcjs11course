const express = require('express')
const api = require('./api.js')
const db = require('./db.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// we need to allow Cross Domain requests. Our client is at localhost:3000 but our server is
// localhost:4000. This is technicaly a 'cross-domain' reuqest. By defualt, these aren't allowed.
// We can whitelist certain origins and allow them to acess our API.
const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.models.Search.find({})
    .limit(10)
    .sort({date: -1})
    .then(results => {
      res.send(results)
      return
    })
})

app.get('/:search', (req, res) => {
  const searchText = req.params.search
  api.searchGifs(searchText).then(r => {
    const data = JSON.parse(r).data
    res.send(data)
    return
  })
})

app.post('/', (req, res) => {
  const searchText = req.body.searchText
  db.models.Search.create({
    text: searchText,
    date: new Date()
  }).then(r => {
    res.send(r)
    return 
  })
})

const server = app.listen(4000, () => {
  console.log('listening on port 4000')
}) 

module.exports = server
