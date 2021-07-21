const express = require('express')
const lineRoutes = require('./line')

const router = express.Router()

router.use('/', (req, res) => {
  res.send('<h1>server is running</h1>');
})

router.use('/line', lineRoutes)

router.use('/test', (req, res) => {
  console.log('hihihi');
  return res.status(200).json(123)
})


module.exports = router
