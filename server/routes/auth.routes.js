let mongoose = require('mongoose')
    express = require('express')
    router = express.Router()
    jwt = require('jsonwebtoken')

const Auth = () => async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(' ')[1]

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, 'RANDOM-TOKEN')

    // retrieve the user details of the logged in user
    const user = await decodedToken

    // pass the the user down to the endpoints here
    request.user = user

    // pass down functionality to the endpoint
    next()
  } catch (error) {
    response.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
// free endpoint
router.get('/free-endpoint', (request, response) => {
  response.json({ message: 'You are free to access me anytime' })
})

// authentication endpoint
router.get('/auth-endpoint', (request, response) => {
  response.json({ message: 'You are authorized to access me' })
})


module.exports = router
