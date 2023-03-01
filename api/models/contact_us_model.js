const sql = require("./db.js");

// constructor
const ContactUsModel = function (data) {
  this.name = data.name;

  this.email = data.email;
  this.message = data.message;
};

ContactUsModel.create = (newDevice, result) => {
  sql.query("INSERT INTO contacts SET ?", newDevice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contacts: ", { id: res.insertId, ...newDevice });
    result(null, { id: res.insertId, ...newDevice });
  });
};

ContactUsModel.getAll = (title, result) => {
  let query = "SELECT * FROM contacts";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("found contacts: ", res);
    result(null, res);
  });
};

module.exports = ContactUsModel;
