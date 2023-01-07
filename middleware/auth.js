const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(400).json({ msg: "token invalid" });
  }
  try {
    const decoded = await jwt.verify(token, "laca");
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    //    console.log(err);
    return res.status(400).json({ msg: "user is not authorized" });
  }
};
module.exports = {
  auth,
};
