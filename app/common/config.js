require('dotenv').config()
const vars = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    API_END_POINT: process.env.API_END_POINT,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}

module.exports = vars;