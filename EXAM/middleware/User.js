const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ msg: "Token not found" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, "secret123");

    req.user = decoded.id;

    next();
  } catch (err) {
    res.json({ msg: "Invalid token" });
  }
};

module.exports = auth;