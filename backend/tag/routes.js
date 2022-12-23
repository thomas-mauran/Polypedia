const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')

const auth = require("../middleware/auth")


router.get("/", auth, controller.getAllTags)
router.post("/", auth, validation.validateCreate, controller.insertTag)



module.exports = router