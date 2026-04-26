const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const report = await Report.create({
      itemName: req.body.itemName,
      description: req.body.description,
      type: req.body.type,
      image: req.file ? req.file.path : (req.body.image || null),
      reportedBy: req.user._id,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  const reports = await Report.find()
    .populate("reportedBy", "name email phoneNumber course section regdNo");

  res.json(reports);
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (report.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this report",
      });
    }

    await report.deleteOne();

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (report.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this report",
      });
    }

    report.itemName = req.body.itemName || req.body.title || report.itemName;
    report.description = req.body.description || report.description;
    report.type = req.body.type || report.type;
    report.image = req.file ? req.file.path : (req.body.image || report.image);

    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
