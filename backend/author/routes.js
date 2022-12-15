const { Router } = require("express");
const controller = require("./controller")
const router = Router()

const auth = require("../middleware/auth")


router.get("/",controller.getAllAuthors)
router.post("/", controller.insertAuthor)



module.exports = router