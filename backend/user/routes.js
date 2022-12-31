const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')

const auth = require ('../middleware/auth')
const adminCheck = require("../middleware/adminCheck")

router.get("/attributes", adminCheck, controller.getAttributes)
router.get("/", auth, controller.getAll)
router.post("/", validation.validateSignup,controller.signup)
router.delete("/:id", adminCheck, controller.deleteFromDb)


router.get("/:id", auth ,controller.getById)
router.post("/login",validation.validateLogin, controller.loginUser)
router.get("/isAdmin/:id", auth ,controller.isUserAdmin)
router.post("/:id", adminCheck, validation.validateUpdate, controller.update)

module.exports = router