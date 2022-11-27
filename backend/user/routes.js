const { Router } = require("express");
const controller = require("./controller")
const router = Router()

router.get("/", controller.getUsers)
router.post("/", controller.createUser)
router.get("/:id", controller.getUserById)
router.post("/login", controller.loginUser)


module.exports = router