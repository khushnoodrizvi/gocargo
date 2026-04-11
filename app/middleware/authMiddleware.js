const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mysecret"; // fallback secret

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Header received:", authHeader); // <-- log here inside the function

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received on backend:", token); // <-- debug

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded); // <-- debug
    req.user = decoded; // attach user info to request
    next(); // continue to next route
  } catch (err) {
    console.log("JWT verification error:", err.message); // <-- debug
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;


// console.log("Header received:", req.headers.authorization);
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authenticateJWT;














// // const jwt = require("jsonwebtoken");
// // const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// // const authenticateJWT = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return res.status(401).json({ message: "Unauthorized" });
// //   }

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     req.user = decoded; // attach payload to req.user
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // module.exports = authenticateJWT;
