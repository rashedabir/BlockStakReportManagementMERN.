const Report = require("../models/reportModel");

const reportCTRL = {
  // report list
  getReport: async (req, res) => {
    try {
      const reports = await Report.find();
      res.json({ error: false, status: 200, reports: reports });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  // create report
  createReport: async (req, res) => {
    try {
      const { name, email, address, phone, profession, fav_color } = req.body;
      if (!name || !email || !address || !phone || !profession || !fav_color) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Report Info" });
      }

      const newReport = new Report({
        name,
        email,
        address,
        phone,
        profession,
        fav_color,
      });
      await newReport.save();
      res.json({ error: false, status: 200, report: newReport });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  // delete single report
  deleteReport: async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Report ID" });
      }
      await Report.findByIdAndDelete(req.params.id);
      res.json({ error: false, status: 200, msg: "Report Deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  // get one report
  findOneReport: async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Report ID" });
      }
      res.json({ error: false, status: 200, report: report });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
  // update one report
  updateReport: async (req, res) => {
    try {
      const { name, email, address, phone, profession, fav_color } = req.body;
      if (!name || !email || !address || !phone || !profession || !fav_color) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Report Info" });
      }

      const report = await Report.findById(req.params.id);
      if (!report) {
        return res
          .status(400)
          .json({ error: true, status: 400, msg: "Invalid Report ID" });
      }
      await Report.findOneAndUpdate(
        { _id: req.params.id },
        { name, email, address, phone, profession, fav_color }
      );
      res.json({ error: false, status: 200, msg: "Report Updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, status: 500, msg: error.message });
    }
  },
};

module.exports = reportCTRL;
