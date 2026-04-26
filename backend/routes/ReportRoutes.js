const express = require("express");
const router = express.Router();
const {
  getReports,
  createReport,
  deleteReport,
  updateReport,
} = require("../controllers/ReportController");
const protect = require("../middleware/AuthMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/reports", protect, upload.single("image"), createReport);
router.get("/reports", protect, getReports);
router.put("/reports/:id", protect, updateReport);
router.delete("/reports/:id", protect, deleteReport);

module.exports = router;
