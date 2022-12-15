const { Router } = require("express");
const controller = require("./controller")
const router = Router()

const auth = require("../middleware/auth")


router.get("/",controller.getAllTags)
router.post("/", controller.insertTag)



module.exports = router