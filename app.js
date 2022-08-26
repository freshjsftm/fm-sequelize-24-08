const express = require("express");
const { ValidationError } = require("sequelize");
const router = require("./router.js");

const app = express();
app.use(express.json());
app.use("/api", router);

// app.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     res.status(500).send({
//       error: [{ message: err.message }],
//     });
//   }
//   next(err);
// });

app.use((err, req, res, next) => {
  res.status(500).send({
    error: [{ message: err.message }],
  });
});

module.exports = app;
