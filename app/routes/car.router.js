const express = require('express')
const { createCar, getCars, getCarById, searchCar } = require('../controllers/car.controller')
const upload = require('../common/cloudinaryConfig')
const router = express.Router()

router.get('/', (req, res, next) => {
    getCars(req, res, next)
})

router.get('/search', (req, res, next) => {
    searchCar(req, res, next)
})

router.get('/:id', (req, res, next) => {
    getCarById(req, res, next)
})

router.post('/save', upload.array("image", 5), (req, res, next) => {
    const imageUrls = req.files.map(file => file.path);
    req.imageUrls = imageUrls;
    createCar(req, res, next)
})



module.exports = router;