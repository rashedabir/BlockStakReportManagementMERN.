const User = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });
    if (user.role === "USER") {
      return res
        .status(400)
        .json({
          error: true,
          status: 400,
          msg: "Admin Recources Access Denied",
        });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, status: 500, msg: error.message });
  }
};

module.exports = authAdmin;
