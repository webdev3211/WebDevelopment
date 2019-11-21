const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb+srv://Shoaib:Shoaib@cluster0-7mkmd.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  err => {
    if (!err) console.log("MONGO DB connection Successfull . ");
    else console.log(JSON.stringify(err, undefined, 2));
  }
);
