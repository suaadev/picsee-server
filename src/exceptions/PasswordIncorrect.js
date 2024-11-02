const ExceptionServer = require("./ExceptionServer");

class PasswordIncorrect extends ExceptionServer {
  constructor() {
    super("Incorrect password", 14, "password_incorrect", 401);
    this.severity = "exception";
  }
}

module.exports = PasswordIncorrect;