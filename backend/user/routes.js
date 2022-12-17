const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')

const auth = require ('../middleware/auth')

router.post("/", validation.validateSignup,controller.signup)
router.get("/:id", auth ,controller.getUserById)
router.post("/login",validation.validateLogin, controller.loginUser)


module.exports = router