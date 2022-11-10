import { Request, Response } from 'express'
import fs from 'fs'
import sharp from 'sharp'

const cashing = (path: string): boolean => {
  try {
    return fs.existsSync(path)
  } catch (e) {
    console.log(e)
  }
  return false
}
const queryValid = (width: number, height: number, path: string): boolean => {
  if (width <= 0 || height <= 0 || !fs.existsSync(path) || isNaN(width) || isNaN(height))
    return false
  return true
}

const image_process = async function resize(req: Request, res: Response, output: string) {
  const name: string = ('images/' + req.query.name) as string
  const width: number = parseInt(req.query.width as string)
  const heigh: number = parseInt(req.query.heigh as string)

  try {
    await sharp(name)
      .resize({ width: width, height: heigh })
      .toFile(output)
      .then(() => {
        res.sendFile(output)
      })
  } catch (error) {
    console.log(error)
  }
}

export default { queryValid, cashing, image_process }
