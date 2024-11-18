const { postRepository } = require("../../../database/dependencies.js");
const { uploadFile, createPublicUrl } = require("../../../services/cloud-storage.service.js");
const errorHandler = require("../../../tools/errorHandler.js");
const { v4: uuid } = require("uuid");
const { extname } = require("path");
const sharp = require("sharp");

const uploadPostController = async (req, res) => {
  try {
    const { userId } = req;
    const photos = req.files;
    const { tags, title } = req.body;
    const filesToCloud = [];
    const imagesToDb = [];
    const folder = "posts";
    const quality = Number(process.env.QUALITY_IMAGES) || 80;

    for (let i = 0; i < photos.length; i++) {
      const { originalname, buffer } = photos[i];
      const prefix = Math.round(Math.random() * 1e4);
      const ext = extname(originalname);
      const fileName = `${prefix}-${uuid()}${ext}`;
      const urlImage = createPublicUrl(folder, fileName);

      imagesToDb.push({ url: urlImage, originalname, title });
      filesToCloud.push(
        (async () => {
          const fileReduced = await sharp(buffer).jpeg({ quality }).toBuffer();
          return { buffer: fileReduced, fileName };
        })()
      );
    }

    const results = await Promise.all(filesToCloud);
    const uploadFilePromise = uploadFile(folder, results);

    await postRepository.create(userId, imagesToDb, tags ?? [], uploadFilePromise);
    return res.sendStatus(204);
  } catch (e) {
    errorHandler(e, req, res);
  }
};

module.exports = uploadPostController;
