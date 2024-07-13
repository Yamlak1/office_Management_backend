const Disbursement = require("../models/disbursement");

const addDisbursment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "The 'name field is required" });
    }

    const disbursement = await Disbursement.create({ name });
    res.status(201).json(`Disbursement Created Successfully `);
  } catch (error) {
    res.status(500).json({ message: "Error creating disbursement", error });
  }
};

const listDisbursements = async (req, res) => {
  try {
    const disbursements = await Disbursement.findAll({
      attributes: ['id', 'name']
    });

    return res.status(200).json(disbursements);
  } catch (error) {
    console.error("Error listing disbursements:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { addDisbursment, listDisbursements };
