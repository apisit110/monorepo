import express from 'express'
import testController from 'libs/controllers/test.controller'

const router = express.Router()

router.get('/', testController.test1())

export default router
