const express = require('express')
const { signIn, signedInUser } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/login', (req, res, next) => {
    signIn(req, res, next)
})

router.get('/logged-in-user', (req, res, next) => {
    signedInUser(req, res, next)
})

module.exports = router;