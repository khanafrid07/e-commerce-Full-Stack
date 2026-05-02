const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + Math.random().toString(36).substring(2, 10) + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
