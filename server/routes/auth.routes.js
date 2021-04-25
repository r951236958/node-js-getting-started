let mongoose = require('mongoose')
    express = require('express')
    router = express.Router()
    jwt = require('jsonwebtoken')

const Auth = require('../auth')
// free endpoint
router.get('/free-endpoint', (request, response) => {
  response.json({ message: 'You are free to access me anytime' })
})

// authentication endpoint
router.get('/auth-endpoint', (request, response) => {
  response.json({ message: 'You are authorized to access me' })
})


module.exports = router
