const express = require("express");

const {
  createCar,
  getCars,
  getCarById,
  searchCar,
  getMyCars,
  getCarByIdAndEdit,
} = require("../controllers/car.controller");

const upload = require("../common/cloudinaryConfig");

const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query?.lat) {
    searchCar(req, res, next);
  } else {
    getCars(req, res, next);
  }
});

router.get("/my-cars", authenticateJWT, getMyCars);

router.get("/:id", (req, res, next) => {
  getCarById(req, res, next);
});

router.get("/edit/:id", (req, res, next) => {
  getCarByIdAndEdit(req, res, next);
});

router.post(
  "/save",
  authenticateJWT,
  upload.array("image", 5),
  (req, res, next) => {
    const imageUrls = req?.files?.map((file) => file.path);
    req.body.images = imageUrls;

    createCar(req, res, next);
  },
);

module.exports = router;
