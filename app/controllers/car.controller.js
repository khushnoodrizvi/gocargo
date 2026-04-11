const carSchema = require('../models/car.model');

carSchema.collection.createIndex({ location: "2dsphere" });

exports.createCar = async (req, res, next) => {
    if(req.body.location){
        req.body.location = JSON.parse(req.body.location)
    }
    if(req.body.area){
        req.body.area = JSON.parse(req.body.area)
    }
    if(req.body.price){
        req.body.price = JSON.parse(req.body.price)
    }
    req.body.host = req.user.id;
    
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
        const cars = await carSchema.find().populate({ path: "host", select: "name email profile_pic", strictPopulate: false });
        res.status(200).json(cars)
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(400).json({ message: error.message })
    }
}
    exports.getMyCars=async(req,res,next)=>{
        try{
            const mycars=await carSchema.find({host:req.user.id}).populate({path: "host", select:"name email profile_pic",strictPopulate:false});
           console.log("user",req.user.id);
           console.log("cars",mycars);
            res.status(200).json(mycars);

        }
        catch(error){
            console.error("Error fetching the cars",error);
            res.status(400).json({message:error.message});
        }
    };

exports.getCarById = async (req, res, next) => {
    try {
        const car = await carSchema.findById(req.params.id);
        
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getCarByIdAndEdit=async (req,res,next)=>{
    try{
      console.log(req.body);
        console.log(req.params.id); 
    }
    catch (error){
        res.status(400).json({message:error.message})
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
                    $maxDistance: 500000
                }
            },
        });
        
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}