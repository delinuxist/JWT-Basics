const { CustomAPIError } = require("../errors/custom-error");

const ErrorsHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      error: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    error: "error",
    message: err.message,
  });
};

module.exports = ErrorsHandler;
