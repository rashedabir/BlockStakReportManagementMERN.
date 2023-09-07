const router = require("express").Router();
const userCTRL = require("../controller/userCTRL");
const auth = require("../middleware/auth");

// user or admin routes
router.post("/register", userCTRL.register);
router.get("/refresh_token", userCTRL.refreshToken);
router.post("/login", userCTRL.login);
router.get("/logout", userCTRL.logout);
router.get("/profile", auth, userCTRL.getUser);

module.exports = router;
