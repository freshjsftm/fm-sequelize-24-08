module.exports.errorHandler = async (error, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    error: [{ message: err.message || "Internal Server Error" }],
  });
};
