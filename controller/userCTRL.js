const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCTRL = {
  register: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        rePassword,
        address,
        phone,
        profession,
        fav_color,
      } = req.body;

      if (!name || !email || !password || !rePassword) {
        return res.status(400).json({ msg: "Invalid Creadentials" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "User Already Exists" });
      }
      if (password.length < 4) {
        return res.status(400).json({
          error: true,
          status: 400,
          msg: "Password must be 4 lengths long",
        });
      }
      if (password !== rePassword) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Password Doesn't Match" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashPass,
        address,
        phone,
        profession,
        fav_color,
      });

      await newUser.save();
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        //   secure: true,
        //   sameSite: "none",
      });

      res.json({ error: false, status: 200, accessToken: accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) {
      return res
        .status(400)
        .json({ error: true, status: 400, msg: "Please Login or Register" });
    }
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Please Login or Register" });
      }
      const accessToken = createAccessToken({ id: user.id });

      res.json({ accessToken });
    });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Creadential" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "User Doesn't Exists" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Incorrect Password" });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        //   secure: true,
        //   sameSite: "none",
      });

      res.json({ error: false, status: 200, accessToken: accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        expires: new Date(0),
        //   secure: true,
        //   sameSite: "none",
      });
      return res.json({ error: false, status: 200, msg: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "User Doesn't Exists" });
      }
      res.json({ error: false, status: 200, user: user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7h" });
};

module.exports = userCTRL;
