const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('<h1>server is running</h1>');
})

router.get('/test', (req, res) => {
  console.log('hihihi');
  return res.status(200).json(123)
})


module.exports = router
