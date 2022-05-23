const express = require("express");
const connectDb = require("./src/config/db.config");
require("dotenv").config();

// handle async errors
require("express-async-errors");
// custom middlewares
const errorsHandlerMiddleware = require("./src/middlewares/errorsHandler");
const notFoundMiddleware = require("./src/middlewares/notFound");
const authRoutes = require("./src/routes/auth.routes");

const Port = process.env.PORT || process.env.port;
const v1 = process.env.v1;

const app = express();

// in built middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to JWT Basics");
});
app.use(`${v1}`, authRoutes);
//custom middlewares
app.use(notFoundMiddleware);
app.use(errorsHandlerMiddleware);

const start = async () => {
  await connectDb();
  console.log("🚀 Database connected");
  app.listen(Port, () => {
    console.log(`🚀 Server running on port: ${Port}`);
  });
};

start();
