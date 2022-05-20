const router = require("express").Router();
const authControllers = require("../controllers/auth.controller");

router.get("/signup", authControllers.signUp);

module.exports = router;
