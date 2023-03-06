import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env')
})
dotenv.config({
  path: path.resolve(
    process.cwd(),
    '..',
    '..',
    'packages',
    'libs',
    '.env.local'
  )
})

const app = express()
const port = process.env.PORTAL_SERVICE_PORT

console.log('port: ', port)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
