const ExceptionServer = require("./ExceptionServer");

class InvalidBody extends ExceptionServer {
  constructor(details) {
    super("Invalid request payload or missing required fields", 13, "invalid_body", 400);
    this.details = details;
    this.severity = "exception";
  }
}

module.exports = InvalidBody;
