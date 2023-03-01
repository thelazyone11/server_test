const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");

// const RegDeviceRoutes = require("./api/routes/reg_device");
const UserRoutes = require("./api/routes/user");
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization,X-Access-Token"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,GET,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use("/api/regdevice", RegDeviceRoutes);
app.use("/api/auth", UserRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
