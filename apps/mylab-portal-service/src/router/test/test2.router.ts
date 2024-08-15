import express from 'express'
import testController from '@lab/libs/controllers/test.controller'

const router = express.Router()

router.get('/', testController.test2())

export default router
