const router = require("express").Router();
const reportCTRL = require("../controller/reportCTRL");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/report")
  .get(auth, reportCTRL.getReport)
  .post(auth, authAdmin, reportCTRL.createReport);

router
  .route("/report/:id")
  .get(auth, reportCTRL.findOneReport)
  .put(auth, authAdmin, reportCTRL.updateReport)
  .delete(auth, authAdmin, reportCTRL.deleteReport);

module.exports = router;
