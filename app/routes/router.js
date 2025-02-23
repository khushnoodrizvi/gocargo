const express = require('express')
const { createUser, getUsers, getUserById } = require('../controllers/user.controller')
const router = express.Router()

router.post('/save', (req, res, next) => {
    console.log('save suer')
    createUser(req, res, next)
})

// router.get('/demo', (req, res, next) => {
//     if(req.session.view)
//     req.session.view += 1;
//   else req.session.view = 1;
//     console.log(req.session.view);
//     res.json(req.session.view);
// })
router.get('/', (req, res, next) => {
    getUsers(req, res, next)
})

router.get('/:id', (req, res, next) => {
    getUserById(req, res, next)
})


module.exports = router;