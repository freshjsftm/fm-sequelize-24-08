const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports.sequelizeErrorHandler = async (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    const {errors:[{message}]} = err;
    return res.status(409).send({
      errors: [{ message }],
    });
  }
  if (err instanceof ValidationError) {
    const {errors:[{message}]} = err;
    return res.status(400).send({
      errors: [{ message }],
    });
  }
  next(err);
};

module.exports.errorHandler = async (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ message: err.message || 'Internal Server Error' }],
  });
};
