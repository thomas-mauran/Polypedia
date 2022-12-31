const { Router } = require("express");
const controller = require("./controller");
const router = Router();
const validator = require("./validator");
const multer = require("multer");
const auth = require("../middleware/auth");
const adminCheck = require("../middleware/adminCheck")

const storage = multer.memoryStorage();

const upload = multer({ storage });

// router.get("/attributes", adminCheck, controller.getAttributes)
router.get("/", auth, controller.getAll);
router.post("/", auth, upload.single("file"), validator.validateCreate, controller.uploadBook);
router.delete("/:id", adminCheck, controller.deleteFromDb);

router.get("/search", auth, controller.search);
// router.post("/id", auth, controller.getBooksByTagName)
router.get("/:id", auth, controller.getBookById);

router.post("/like/:id", auth, controller.likeBook);
router.post("/unlike/:id", auth, controller.unlikeBook);
router.get("/likedBooks/:userToken", auth, controller.getLikedBooks);

module.exports = router;
