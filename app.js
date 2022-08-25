const express = require("express");
const router = require("./router.js");

const app = express();
app.use(express.json());
app.use('/api', router);

app.use((err,req,res,next)=>{
  console.log(err.message)
})

module.exports = app;
