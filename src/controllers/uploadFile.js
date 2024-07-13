const AWS = require("aws-sdk");
require("dotenv").config();
const File = require("../models/uploadedFile");
const UploadedFile = require("../models/uploadedFile");

const spacesEndpoint = new AWS.Endpoint(`${process.env.SPACE_END_POINT}`);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

const uploadFileToSpace = (fileBuffer, bucketName, key) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ACL: "public-read",
  };

  return s3.upload(uploadParams).promise();
};

const uploadFileController = async (req, res) => {
  try {
    const file = req.file;
    const fileName = req.body.fileName;
    const userId = req.body.userId;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucketName = "PortalTemp";
    const key = `uploads/${fileName}-${Date.now()}-${file.originalname}`;

    const result = await uploadFileToSpace(file.buffer, bucketName, key);

    const url = result.Location;

    const reports = await File.create({
      file_name: fileName,
      fileLink: url,
      userId: userId,
    });

    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
};

const viewUploadedFile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const files = await UploadedFile.findAll({
      where: { userId },
      attributes: ["fileLink", "file_name"],
    });

    if (files.length === 0) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { uploadFileController, viewUploadedFile };
