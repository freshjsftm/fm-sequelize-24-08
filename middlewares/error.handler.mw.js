const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports.sequelizeErrorHandler = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.log('log ValidationError ============>>>>>>>>');
    console.dir(err);
    const {errors:[{message}]} = err;
    return res.status(400).send({
      errors: [{ message }],
    });
  }
  next(err);
};

module.exports.errorHandler = async (err, req, res, next) => {
  console.log('log error ============>>>>>>>>');
  console.dir(err);

  const status = err.status || 500;
  res.status(status).send({
    errors: [{ message: err.message || 'Internal Server Error' }],
  });
};
