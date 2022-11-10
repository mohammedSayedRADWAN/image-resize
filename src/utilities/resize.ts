import express, { Request, Response } from 'express'
import middelware from './serve'
import path from 'path'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const name: string = ('images/' + req.query.name) as string
  const width: number = parseInt(req.query.width as string)
  const heigh: number = parseInt(req.query.heigh as string)

  const output =
    path.dirname(path.dirname(__dirname)) + '/output/' + width + '-' + heigh + '-' + req.query.name

  if (middelware.queryValid(width, heigh, name)) {
    console.log('valid query')

    if (middelware.cashing(output)) {
      console.log('cached')
      return res.sendFile(output)
    } else {
      middelware.image_process(req, res, output)
    }
  } else {
    res.send('height and width must >0 and name of image must exist in your folder')
  }
})

export default router

/*import sharp from 'sharp'
import express, { Request, Response } from 'express'
import middelware from './serve'
import path from 'path'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const info={ name: ('images/' + req.query.name) as string,
              width:parseInt(req.query.width as string),
             heigh:  parseInt(req.query.heigh as string)
            }
  

  const output =path.dirname(path.dirname(__dirname)) + '/output/' + info.width + '-' + info.heigh + '-' + req.query.name

  if (middelware.queryValid(info.width,info.heigh,info.name)) {
    console.log('valid query')

    if (middelware.cashing(output)) {
      console.log('cached')

      return res.sendFile(output)
    } else {
      try {
        await sharp(info.name)
          .resize({ width: info.width, height: info.heigh })
          .toFile(output)
          .then(() => {
            res.sendFile(output)
          })
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    res.send('height and width must >0 and name of image must exist in your folder')
  }
})

export default {router}
 */
