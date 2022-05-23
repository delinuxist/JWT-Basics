const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const ErrorsHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      status: "error",
      error: err.message,
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    error: err.message,
  });
};

module.exports = ErrorsHandler;
