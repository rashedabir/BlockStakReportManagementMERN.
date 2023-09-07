const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization ? authorization.split("Bearer ")[1] : null;

    // check has token or not
    if (!token) {
      return res
        .status(400)
        .json({ error: true, status: 400, msg: "Invalid Athentication" });
    }
    // if token then verify authentication
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Athentication" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
