const express = require("express");
const RegDeviceModel = require("../models/reg_device_model");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/:deviceId", (req, res, next) => {
  RegDeviceModel.findBydeviceId(req.params.deviceId.toString(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Device with id ${req.params.deviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Device with id " + req.params.deviceId,
        });
      }
    } else res.send(data);
  });
});

// create
router.post("/", auth, (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const regDeviceModel = new RegDeviceModel({
    deviceId: req.body.deviceId,
    username: req.body.username,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    empCode: req.body.empCode,
    active: req.body.active,
  });

  RegDeviceModel.create(regDeviceModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the device.",
      });
    else res.send(data);
  });
});

// Retrieve all
router.get("/", auth, (req, res) => {
  const title = req.query.title;

  RegDeviceModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deviceid.",
      });
    else res.send(data);
  });
});

// Delete  with id with auth
router.delete("/:id", auth, (req, res) => {
  RegDeviceModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deviceid with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete deviceid with id " + req.params.id,
        });
      }
    } else res.send({ message: `deviceid was deleted successfully!` });
  });
});

// Update  with id
router.put("/:id", auth, (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  RegDeviceModel.updateById(
    req.params.id,
    new RegDeviceModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deviceid with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating deviceid with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
});

module.exports = router;
