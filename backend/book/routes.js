const { Router } = require("express");
const controller = require("./controller")
const router = Router()

const auth = require("../middleware/auth")


router.get("/", auth ,controller.getAllBooks)
router.post("/getByTag", auth, controller.getBooksByTagName)



module.exports = router