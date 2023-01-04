const { Router } = require("express");
const controller = require("./controller");
const router = Router();
const validator = require("./validator");
const multer = require("multer");
const auth = require("../middleware/auth");
const adminCheck = require("../middleware/adminCheck")

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get("/", auth, controller.getAll);
router.post("/", auth, upload.single("file"), validator.validateCreate, controller.uploadBook);
router.delete("/:id", adminCheck, controller.deleteFromDb);

router.get("/search", auth, controller.search);
router.get("/:id", auth, controller.getBookById);
router.patch("/:id", adminCheck, upload.single("file"), validator.validateUpdate, controller.update)

router.post("/like/:id", auth, controller.likeBook);
router.post("/unlike/:id", auth, controller.unlikeBook);
router.get("/likedBooks/:userToken", auth, controller.getLikedBooks);

module.exports = router;
