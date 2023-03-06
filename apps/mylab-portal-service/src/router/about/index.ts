import express from 'express'
import aboutController from 'libs/controllers/about.controller'

const router = express.Router()

router.get('/', aboutController.about())

export default router
