const express = require('express')

const router = express.Router()

router.route('/log')
  .get(log)

function log(req, res, next) {
  console.log(`in showLogin`);
  
  res.send('<h1>Line api /log</h1>');
  
}

module.exports = router
