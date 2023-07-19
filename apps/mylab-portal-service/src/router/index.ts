import express, { Request, Response, NextFunction } from 'express'

import aboutRouter from './about'
// import testRouter from './test'

const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(Math.random())
  res.send('Express + TypeScript Server edited')
  next()
})
router.use('/about', aboutRouter)
// router.use('/test', testRouter)

export default router
