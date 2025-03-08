const express = require("express");
const router = express.Router();

//insert modell
const User = require("../Model/userModel");
// insert contoller
const UserController = require("../controlers/userControl");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

//export
module.exports = router;