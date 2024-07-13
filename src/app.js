const express = require("express");
const cors = require("cors");
const { testConnection } = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//MODELS
const DisbursementForecast = require("./models/disbrusement_forcas");
const Disbursement = require("./models/disbursement");
const Report = require("./models/reports");
const User = require("./models/user");
const Files = require("./models/uploadedFile");

//ExpressAPP
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your React app's address
    credentials: true, // enable set cookie and credentials
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

//ASSOCIATION
User.hasMany(Report);
Report.belongsTo(User);
Disbursement.hasMany(DisbursementForecast);
DisbursementForecast.belongsTo(Disbursement);
User.hasMany(DisbursementForecast);
DisbursementForecast.belongsTo(User);
User.hasMany(Files);
Files.belongsTo(User);

testConnection();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB (adjust as needed)
});

//ROUTES
const userRoutes = require("./routes/userRoutes");
const disbursmentRoutes = require("./routes/disbursmentRoutes");
const disbursmentForecastRoutes = require("./routes/disbrusement_forcast_Routes");
const reportRoutes = require("./routes/reportRoutes");
const fileUploadRouter = require("./routes/uploadFile");

//Middleware to parse JASON bodies
app.use(bodyParser.json());

// Middleware to handle file uploads
app.use(upload.single("file"));

// Middleware to handle Authentication
const { checkAuthadmin } = require("./controllers/checkAuthadmin");
const { checkAuthuser } = require("./controllers/checkAuthuser");

//API
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/users", userRoutes);
app.use("/api/disbursment", checkAuthuser, disbursmentRoutes);
app.use("/api/disbursmentForecast", disbursmentForecastRoutes);
app.use("/api/report", checkAuthuser, reportRoutes);
app.use("/api/file", checkAuthuser, fileUploadRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
