const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb://tushar:abc123@ds263307.mlab.com:63307/stepup",
  { useNewUrlParser: true },
  err => {
    if (!err) console.log("MONGO DB connection Successfull . ");
    else console.log(JSON.stringify(err, undefined, 2));
  }
);
