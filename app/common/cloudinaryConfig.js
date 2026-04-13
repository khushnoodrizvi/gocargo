const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const vars = require("./config");
const multer = require("multer");

cloudinary.config({
  cloud_name: vars.CLOUDINARY_CLOUD_NAME,
  api_key: vars.CLOUDINARY_API_KEY,
  api_secret: vars.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "car_images",
    format: async (req, file) => "png", 
    public_id: (req, file) => file.originalname.split(".")[0],
    transformation: [
      { width: 800, crop: "limit" }, 
      { quality: "auto" }, 
    ],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
