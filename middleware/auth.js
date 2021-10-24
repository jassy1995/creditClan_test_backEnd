const keys = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");
exports.isLogin = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({
      errorResponse: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, keys);
    req.user = decoded;
  } catch (err) {
    return res.json({ errorResponse: "Invalid Token" });
  }
  return next();
};
