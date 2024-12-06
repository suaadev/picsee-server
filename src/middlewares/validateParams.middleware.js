const sharp = require("sharp");
const InvalidBody = require("../exceptions/InvalidBody");
const errorHandler = require("../tools/errorHandler");

const isValidPassword = (pass) => {
  if (String(pass).length < 9) {
    throw new InvalidBody("Password must be at least 9 characters long");
  }
};

const isValidEmail = (email) => {
  const regex_ = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex_.test(String(email))) {
    throw new InvalidBody("Invalid email address format");
  }
};

const validateSign = (req, res, next) => {
  const { user, password } = req.body;
  try {
    if (String(user).trim() === "" || String(password).trim() === "") {
      throw new InvalidBody("Fields cannot be empty");
    }
    isValidPassword(password);
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

const validateCreateUser = (req, res, next) => {
  const { username, password, email, firstNames, lastNames } = req.body;
  try {
    [username, firstNames, lastNames, email, password].forEach((v) => {
      if (String(v).trim() === "") {
        throw new InvalidBody("Fields cannot be empty");
      }
    });
    isValidEmail(email);
    isValidPassword(password);
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

const validateUploadPost = async (req, res, next) => {
  try {
    let photos = req.files;
    if (!photos) {
      throw new InvalidBody("No photos provided for upload");
    }
    if (!photos.length) {
      photos = [photos];
    }
    if (photos.length > 5) {
      throw new InvalidBody("Maximum of 5 photos allowed per upload");
    }
    let sizeTotal = 0;
    for (let f of photos) {
      sizeTotal += f.size;
      if (!["image/jpg", "image/png", "image/jpeg"].includes(f.mimetype)) {
        throw new InvalidBody("Only JPG, PNG, and JPEG file types are supported");
      }
      if (sizeTotal > 20000000) {
        throw new InvalidBody("Payload exceeds maximum size limit of 20MB");
      }
      await sharp(f.buffer).metadata();
    }
    const { tags } = req.body;
    if (tags) {
      const tagsArrayJson = JSON.parse(tags);
      for (let i = 0; i < tagsArrayJson.length; i++) {
        if (!Array.isArray(tagsArrayJson[i])) {
          throw new InvalidBody("Tags must be structured as an array");
        }
      }
      req.body.tags = tagsArrayJson;
    }
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

const validateUpdateUser = (req, res, next) => {
  try {
    const validKeys = ["firstName", "lastName", "dateBorn", "bio", "socialLinks", "avatar"];
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i++) {
      if (!validKeys.includes(keys[i])) {
        throw new InvalidBody("Invalid properties provided in request body");
      }
      if (String(req.body[keys[i]]).trim() === "") {
        throw new InvalidBody("Properties cannot be empty");
      }
      if (Array.isArray(req.body[keys[i]]) && req.body[keys[i]].length === 0) {
        throw new InvalidBody("Properties cannot be empty");
      }
    }
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

const passwordValidation = (req, res, next) => {
  try {
    const { password } = req.body;
    isValidPassword(password);
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

const emailValidation = (req, res, next) => {
  try {
    const { email } = req.body;
    isValidEmail(email);
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

module.exports = {
  validateSign,
  validateCreateUser,
  validateUploadPost,
  validateUpdateUser,
  passwordValidation,
  emailValidation,
};
