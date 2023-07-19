import express from 'express'
// import aboutController from 'libs/controllers/about.controller'
// import testController from 'libs/controllers/test.controller'

const router = express.Router()

// router.get('/', aboutController.about())
router.get('/', (req, res, next) => {
  console.log('22222')
  res.send('2222222')
  next()
})

export default router
