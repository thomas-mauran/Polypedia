const { Router } = require("express");
const controller = require("./controller")
const router = Router()
const validation = require('./validator')


router.post("/", validation.validateSignup,controller.signup)
router.get("/:id" ,controller.getUserById)
router.post("/login",validation.validateLogin, controller.loginUser)


module.exports = router