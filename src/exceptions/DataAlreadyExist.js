const ExceptionServer = require("./ExceptionServer");

class DataAlreadyExist extends ExceptionServer {
  constructor(field) {
    super(field ? field : "Username or email is already in use", 10, "data_already_exist", 202);
    this.severity = "exception";
  }
}

module.exports = DataAlreadyExist;