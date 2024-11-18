const { Storage } = require('@google-cloud/storage');

const getStorageClient = () => {
  const options = {};
  if (process.env.GCP_PROJECT_ID) {
    options.projectId = process.env.GCP_PROJECT_ID;
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    options.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
  return new Storage(options);
};

const createPublicUrl = (folder, fileName) => {
  return `https://storage.googleapis.com/${process.env.BUCKET_NAME || 'picsee-storage'}/${folder}/${fileName}`;
};

const uploadFile = async (folder, files) => {
  const storage = getStorageClient();
  const folderPath = `${folder}/`;
  const bucket = storage.bucket(process.env.BUCKET_NAME || 'picsee-storage');
  const folderFile = bucket.file(folderPath);
  const [folderExists] = await folderFile.exists();
  if (!folderExists) {
    await folderFile.save('', { resumable: false });
  }
  const promises = [];
  for (let i = 0; i < files.length; i++) {
    const { fileName, buffer } = files[i];
    const filePath = `${folder}/${fileName}`;
    const file = bucket.file(filePath);
    promises.push(
      file.save(buffer, {
        resumable: false,
        metadata: {
          contentType: 'auto',
        },
      }),
    );
  }
  await Promise.all(promises);
};

module.exports = {
  uploadFile,
  createPublicUrl,
};