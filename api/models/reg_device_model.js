const sql = require("./db.js");

// constructor
const RegDevice = function (data) {
  this.deviceId = data.deviceId;
  this.username = data.username;
  this.email = data.email;
  this.mobileNo = data.mobileNo;
  this.empCode = data.empCode;
  this.active = data.active;
};

RegDevice.create = (newDevice, result) => {
  sql.query("INSERT INTO devices SET ?", newDevice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created device: ", { id: res.insertId, ...newDevice });
    result(null, { id: res.insertId, ...newDevice });
  });
};

RegDevice.findBydeviceId = (deviceId, result) => {
  sql.query(
    `SELECT * FROM devices WHERE deviceId = "${deviceId}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found device: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found device with the id
      result({ kind: "not_found" }, null);
    }
  );
};

RegDevice.getAll = (title, result) => {
  let query = "SELECT * FROM devices";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("found device: ", res);
    result(null, res);
  });
};

RegDevice.remove = (id, result) => {
  sql.query("DELETE FROM devices WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted deviceid with id: ", id);
    result(null, res);
  });
};

RegDevice.updateById = (id, updateDevice, result) => {
  sql.query(
    "UPDATE devices SET deviceId = ?, active = ? WHERE id = ?",
    [updateDevice.deviceId, updateDevice.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...updateDevice });
      result(null, { id: id, ...updateDevice });
    }
  );
};

module.exports = RegDevice;
