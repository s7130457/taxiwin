const express = require('express')

const router = express.Router()


router.get('/test', (req, res) => {
  console.log('hihihi');
  return res.status(200).json(123)
})


module.exports = router