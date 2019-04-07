const request = require('supertest')
const makeServer = require('../server')
const makeDatabase = require('../db')

function seedData(db){
  db.dropCollection('searches')
  return db.models.Search.insertMany([{text: 'search1', data: new Date()}])
}

describe("server routes", () => {
  let server 
  const db = makeDatabase('mongodb://localhost:27017/test')

  beforeAll(async () => {
    server = await makeServer(db)
    await seedData(db)
    return server
  })

  afterAll(async() => {
    await server.close()
  })

  describe("GET /", () => {
    test("should respond to index route and have data from the database", () => {
      return request(server).get('/').then(response => {
        console.log(response.body)
        expect(response.status).toEqual(200)
        expect(response.body.length).toBe(1)
      })
    })
  })

  describe("GET /:search", () => {
    const route = '/search'
    test("should respond to search route and return data from the API call", () => {
      return request(server).get(route).then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
      })
    })
  })

  describe("POST /", () => {
    const route = '/'
    test("should respond to POST route and return a new database item", () => {
      return request(server)
        .post('/')
        .send({
          searchText: 'search'
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.body.text).toBe('search')
        })
    })
  })
})