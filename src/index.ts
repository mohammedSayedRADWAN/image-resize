import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import resize from './utilities/resize'
dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.send('home')
})
app.use('/images', resize)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
