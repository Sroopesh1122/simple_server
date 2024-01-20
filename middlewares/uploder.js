const { log } = require("console");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require('fs')

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + suffix + ".jpeg");
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fieldSize: 2000000 },
});

const imagesResize = async (req, res, next) => {
  if (!req?.files) {
    next();
  }
  const newPath=[]
  req.files.map(async (file) => {
    try {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/images/${file.filename}`);
        newPath.push(`../uploads/images/${file.filename}`)
        // fs.unlinkSync(file.path)

    } catch (error) {
      console.log(error);
    }
    req.newPaths = newPath
    next()
  });
};

module.exports = { upload, imagesResize };
