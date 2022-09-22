const express = require('express');
const cors = require('cors');
const router = require('./routes');
const {
  errorHandler,
  validationErrorHandler,
} = require('./middlewares/error.handler.mw');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.use(sequelizeErrorHandler);
app.use(errorHandler);

module.exports = app;
