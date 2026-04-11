const express = require('express');
const { createUser, getUsers, getUserById } = require('../controllers/user.controller');
const authJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/save', (req, res, next) => {
    console.log('save user');
    createUser(req, res, next);
});

// router.get('/demo', (req, res, next) => {
//     if(req.session.view)
//         req.session.view += 1;
//     else
//         req.session.view = 1;
//     console.log(req.session.view);
//     res.json(req.session.view);
// });

router.get('/', authJWT, (req, res, next) => {
    getUsers(req, res, next);
});

router.get('/:id', authJWT, (req, res, next) => {
    getUserById(req, res, next);
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const authJWT = require('../middleware/authMiddleware');
// const isAdmin = require('../middleware/isAdmin');
// const { createUser, approveAdmin, getPendingAdmins } = require('../controllers/user.controller');

// // Register a user or request admin
// router.post('/save', createUser);

// // Approve admin (only approved admins)
// router.put('/approve/:id', authJWT, isAdmin, approveAdmin);

// // List pending admin requests
// router.get('/pending-admins', authJWT, isAdmin, getPendingAdmins);

// module.exports = router;
// -----------------
// const express = require('express')
// const { createUser, getUsers, getUserById,} = require('../controllers/user.controller')
// const authJWT=require("../middleware/authMiddleware")
// const router = express.Router()

// router.post('/save', (req, res, next) => {
//     console.log('save user')
//     createUser(req, res, next)
// })

// // router.get('/demo', (req, res, next) => {
// //     if(req.session.view)
// //     req.session.view += 1;
// //   else req.session.view = 1;
// //     console.log(req.session.view);
// //     res.json(req.session.view);
// // })
// router.get('/', authJWT,(req, res, next) => {
//     getUsers(req, res, next)
// })

// router.get('/:id',authJWT, (req, res, next) => {
//     getUserById(req, res, next)
// })
    

// module.exports = router;