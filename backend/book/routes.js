const { Router } = require("express");
const controller = require("./controller");
const router = Router();
const validator = require("./validator");
const multer = require("multer");
const auth = require("../middleware/auth");

const storage = multer.memoryStorage();

const upload = multer({storage});

router.post("/search", auth, controller.getAllBooks);
// router.post("/id", auth, controller.getBooksByTagName)
router.post("/:id", auth, controller.getBookById);

router.post(
  "/",
  auth,
  upload.single("file"),
  validator.validateCreate,
  controller.uploadBook
);

router.post("/like/:id", auth, controller.likeBook);
router.post("/unlike/:id", auth, controller.unlikeBook);


module.exports = router;
