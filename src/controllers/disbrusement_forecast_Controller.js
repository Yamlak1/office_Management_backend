const DisbursementForecast = require("../models/disbrusement_forcas");
const Disbursement = require("../models/disbursement");

const CreateDisbrusmentForcast = async (req, res) => {
  try {
    const {
      expected_date,
      expected_amount,
      milestone,
      deliverables,
      userId,
      disbursementId,
    } = req.body;

    if (!expected_date || !expected_amount || !milestone || !deliverables) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const disbursementForecast = await DisbursementForecast.create({
      expected_date,
      expected_amount,
      milestone,
      deliverables,
      disbursementId,
      userId,
    });

    res.status(201).json(disbursementForecast);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating disbursement forecast", error });
  }
};

const viewDisbursementForecast = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const forecasts = await DisbursementForecast.findAll({
      where: { userId },
      attributes: [
        "userId",
        "disbursementId",
        "expected_date",
        "expected_amount",
        "milestone",
        "deliverables",
      ],
    });

    if (forecasts.length === 0) {
      return res
        .status(404)
        .json({ message: "No disbursement forecasts found for this user" });
    }

    // Fetch the disbursement names
    const disbursementIds = forecasts.map(
      (forecast) => forecast.disbursementId
    );
    const disbursements = await Disbursement.findAll({
      where: {
        id: disbursementIds,
      },
      attributes: ["id", "name"],
    });

    // Create a map of disbursementId to name
    const disbursementMap = {};
    disbursements.forEach((disbursement) => {
      disbursementMap[disbursement.id] = disbursement.name;
    });

    // Add the name to each forecast
    const result = forecasts.map((forecast) => {
      return {
        ...forecast.dataValues,
        name: disbursementMap[forecast.disbursementId],
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching disbursement forecasts:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { CreateDisbrusmentForcast, viewDisbursementForecast };
