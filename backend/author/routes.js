const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')

const auth = require("../middleware/auth")
const adminCheck = require("../middleware/adminCheck")


router.get("/", auth, controller.getAllAuthors)
router.post("/", adminCheck, validation.validateCreate, controller.insertAuthor)



module.exports = router