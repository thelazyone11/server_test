const sql = require("./db.js");

// constructor
const UsersModel = function (data) {
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.email = data.email;
  this.password = data.password;
  this.token = data.token;
};

UsersModel.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

UsersModel.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found email: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found device with the id
    result({ kind: "not_found" }, null);
  });
};

UsersModel.updateTokenById = (id, token, result) => {
  sql.query(
    "UPDATE users SET token = ? WHERE id = ?",
    [token, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated token: ", { id: id });
      result(null, { id: id });
    }
  );
};

UsersModel.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = UsersModel;
