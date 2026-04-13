const express = require('express');
const { signIn, signedInUser, signOut } = require('../controllers/auth.controller');
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/login', (req, res, next) => {
    signIn(req, res, next);
});

router.get('/logout', (req, res, next) => {
    signOut(req, res, next);
});

router.get('/session', authenticateJWT, (req, res, next) => {
    signedInUser(req, res, next);
});

module.exports = router;
