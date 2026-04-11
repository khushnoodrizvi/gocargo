const express = require('express');
const { signIn, signedInUser, signOut } = require('../controllers/auth.controller');
const authJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/login', (req, res, next) => {
    signIn(req, res, next);
});

router.get('/logout', (req, res, next) => {
    signOut(req, res, next);
});

router.get('/session', authJWT, (req, res, next) => {
    signedInUser(req, res, next);
});

module.exports = router;

// const express = require('express')
// const { signIn, signedInUser, signOut } = require('../controllers/auth.controller')
// const authJWT=require("../middleware/authMiddleware")
// const router = express.Router()

// router.post('/login', (req, res, next) => {
//     signIn(req, res, next)
// })

// router.get('/logout', (req, res, next) => {
//     signOut(req, res, next)
// })

// router.get('/session',authJWT, (req, res, next) => {
//     signedInUser(req, res, next)
// })

// module.exports = router;