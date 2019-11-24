const mongoose = require("mongoose");
const db = "mongodb://tushar:abc123@ds263307.mlab.com:63307/stepup";


module.exports = mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));