const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
// dotenv.config();
const authRouter = require("./app/routes/auth.router");
const carRouter = require("./app/routes/car.router");
const userRouter = require("./app/routes/router");
const orderRouter = require("./app/routes/order.router");
const app = express();
const PORT=3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true 
}));
app.options("*", cors({
  origin: "http://localhost:3001",
  credentials: true
}));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log("Error connecting to DataBase", err));

app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});



































// const handle = require('./app/server')
// const express = require('express')
// const path = require('path');
// const { PORT } = require('./app/common/config');
// const httpServer = require("http").createServer(handle)
// const port = PORT || 3000
// handle.use(express.static(path.join(__dirname, "/build")));

// handle.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/build', 'index.html'));
// });

// httpServer.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
