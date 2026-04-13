const express = require("express");
const router = express.Router();

const {
  getCars,
  getCarById,
  searchCar,
  createCar,
  getMyCars,
} = require("../controllers/car.controller");

const {
  createUser,
  getUsers,
  getUserById,
} = require("../controllers/user.controller");

const { authenticateJWT } = require("../middleware/authMiddleware");

router.get("/cars", (req, res, next) => {
  if (req.query?.lat) {
    searchCar(req, res, next);
  } else {
    getCars(req, res, next);
  }
});

router.get("/cars/:id", (req, res, next) => {
  getCarById(req, res, next);
});

router.get("/my-cars", authenticateJWT, (req, res, next) => {
  getMyCars(req, res, next);
});

router.post("/cars/save", authenticateJWT, (req, res, next) => {
  createCar(req, res, next);
});

router.get("/users", authenticateJWT, (req, res, next) => {
  getUsers(req, res, next);
});

router.get("/users/:id", authenticateJWT, (req, res, next) => {
  getUserById(req, res, next);
});
router.post("/save", (req, res, next) => {
  createUser(req, res, next);
});

module.exports = router;
