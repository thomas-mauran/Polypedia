const { Router } = require("express");
const controller = require("./controller");
const router = Router();
const validator = require("./validator");
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "test/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${file.originalname}`);
//     },
//   });

//   const upload = multer({ dest: 'test/' });
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype) {
      var ext = file.mimetype;

      console.log(ext);
      if (ext !== "application/pdf") {
        return callback(new Error("Only pdf are allowed"));
      }
      callback(null, true);
    }
  },
});

const auth = require("../middleware/auth");

router.get("/", auth, controller.getAllBooks);
// router.post("/getByTag", auth, controller.getBooksByTagName)
router.post(
  "/",
  upload.single("file"),
  validator.validateCreate,
  controller.uploadBook
);

module.exports = router;
