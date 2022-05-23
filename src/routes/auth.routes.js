const router = require("express").Router();
const authControllers = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/signup", authControllers.signUp);

router.post("/login", authControllers.signIn);

router.get("/dashboard", authMiddleware, authControllers.dashboard);

module.exports = router;
