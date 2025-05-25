import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 120 * 1024 * 1024, files: 1 }, // 120 MB
  fileFilter: (req, file, callback) => {
    let allowedTypes = [
      // image
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      // music
      "audio/mpeg",
      "audio/wav",
      "audio/webm",
      "audio/aac",
      "audio/ogg",
      // video
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime"
    ];
    console.log('file.mimetype', file.mimetype)
    callback(null, true); // accept file
    // if (allowedTypes.includes(file.mimetype)) {
    // } else {
    //   callback(new Error(Code.FILE_NOT_SUPPORTED)); // reject file
    // }
  },
});