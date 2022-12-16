const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')

const auth = require("../middleware/auth")


router.get("/",controller.getAllAuthors)
router.post("/", validation.validateCreate, controller.insertAuthor)



module.exports = router