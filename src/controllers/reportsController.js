const report = require("../models/reports");

const addReport = async (req, res) => {
  try {
    const { report_data, userId } = req.body;

    if (!report_data || !userId) {
      return res
        .status(400)
        .send({ message: "The report and userId is required" });
    }

    const reports = await report.create({
      report: report_data,
      userId,
    });
    res.status(201).json(`Report Created Successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating report", error });
  }
};

const fetchReport = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const reports = await report.findAll({
      where: {
        userId: userId
      }
    });

    if (!reports || reports.length === 0) {
      return res.status(404).send({ message: "No reports found for this user" });
    }

    return res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching reports", error });
  }
};



module.exports = { addReport, fetchReport };
