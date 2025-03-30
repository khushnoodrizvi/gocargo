const mongoose = require('mongoose')
const { Schema } = mongoose;

const carSchema = new Schema({
  name: String,
  accessories: [String],
  images: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'], // Only "Point" type is allowed
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers: [longitude, latitude]
      required: true,
      index: '2dsphere', // Enables geospatial queries
    },
  },
  area: { address: String, city: String },
  price: { striked_price: String, selling_price: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  rating: Number,
  trips: Number,
  type: String,
  description: String,
  fuel_type: String,
  seats: String,
  car_distance: String,
  car_features: [String],
});

// Ensure the 2dsphere index is created
carSchema.index({ location: "2dsphere" });

module.exports =  mongoose.model('car', carSchema);