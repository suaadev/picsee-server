const ExceptionServer = require("./ExceptionServer");

class UserNotFound extends ExceptionServer {
  constructor(user) {
    super(`User [${user}] not found`, 17, "user_not_found", 404);
    this.severity = "exception";
  }
}

module.exports = UserNotFound;