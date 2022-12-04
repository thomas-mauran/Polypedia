const { Router } = require("express");
const controller = require("./controller")
const router = Router()

router.post("/", controller.signup)
router.get("/:id", controller.getUserById)
router.post("/login", controller.loginUser)


module.exports = router