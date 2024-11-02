const ExceptionServer = require("./ExceptionServer");

class FailedUploadImageKit extends ExceptionServer {
  constructor() {
    super("Failed to upload image assets, please try again later", 12, "failed_upload", 500);
    this.severity = "error";
  }
}

module.exports = FailedUploadImageKit;