import path from 'path'
import supertest from 'supertest'
import app from '../index'
import middelware from '../utilities/serve'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('route is created without error', async () => {
    const response = await request.get('/images')
    expect(response.status).toBe(200)
  })
  it('cheack Functionality correct of image resize', async () => {
    const response = await request.get('/images?name=fjord.jpg&width=200&heigh=200')
    expect(response.status).toBe(200)
  })
})

describe('middleware checks', () => {
  const fileName = 'fjord.jpg'
  const width = 200
  const heigh = 200
  const output =
    path.dirname(path.dirname(__dirname)) + '/output/' + width + '-' + heigh + '-' + fileName
  it('queryValid expected to return true', () => {
    expect(middelware.queryValid(width, heigh, './images/' + fileName)).toBeTruthy()
  })
  it('cashing expected to return true', () => {
    expect(middelware.cashing(output)).toBeTruthy()
  })
})
