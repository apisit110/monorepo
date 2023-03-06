import express from 'express'
import test1Router from './test1.router'
import test2Router from './test2.router'

const router = express.Router()

router.use('/test1', test1Router)
router.use('/test2', test2Router)

export default router
