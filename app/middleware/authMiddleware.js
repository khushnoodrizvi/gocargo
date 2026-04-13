const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received on backend:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = { authenticateJWT, isAdmin };
