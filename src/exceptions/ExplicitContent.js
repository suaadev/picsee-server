const ExceptionServer = require("./ExceptionServer");

class ExplicitContent extends ExceptionServer {
  constructor() {
    super("Image contains explicit or restricted content", 11, "content_explicit", 400);
    this.severity = "exception";
  }
}

module.exports = ExplicitContent;
