import express from 'express'
import '@lab/libs/helpers/dotenv'

import router from './router'
import logController from '@lab/libs/controllers/log.controller'

const app = express()
const PORT = Number(process.env.PORTAL_SERVICE_PORT)

app.use(logController.createRequestLog())
app.use(router)
app.use(logController.createResponseLog())
// app.use(createErrorLog)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
