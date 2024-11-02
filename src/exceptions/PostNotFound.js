const ExceptionServer = require("./ExceptionServer");

class PostNotFound extends ExceptionServer {
  constructor(postId) {
    super(`Post [${postId}] not found`, 15, "post_not_found", 404);
    this.severity = "exception";
  }
}

module.exports = PostNotFound;