const carSchema = require('../models/car.model');

exports.createCar = async (req, res, next) => {
    const car = new carSchema({
        ...req.body
    })
    try {
        const carCreated = await car.save()
        res.status(201).json(carCreated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getCars = async (req, res, next) => {
    try {
        const cars = await carSchema.find();
        res.status(200).json(cars)
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(400).json({ message: error.message })
    }
}

exports.getCarById = async (req, res, next) => {
    try {
        const car = await carSchema.findById(req.params.id);
        
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.searchCar = async (req, res, next) => {
    try {
        const lat = parseFloat(req.query.lat);
        const long = parseFloat(req.query.long);
        if(isNaN(lat) || isNaN(long)){
            return res.status(400).json({
                message: "Invalid coordinates"
            })
        }
        const car = await carSchema.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, long]
                    },
                    $maxDistance: 1000
                }
            },
        });
        
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}