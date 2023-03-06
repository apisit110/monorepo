import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import router from './router'
import logController from 'libs/controllers/log.controller'

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

app.use(logController.createRequestLog())
app.use(router)
app.use(logController.createResponseLog())
// app.use(createErrorLog)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
