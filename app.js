const express = require("express");
const { ValidationError } = require("sequelize");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    error: [{ message: err.message || 'Internal Server Error'}],
  });
});

module.exports = app;
