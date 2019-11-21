const mongoose = require("mongoose");

<<<<<<< HEAD
module.exports = mongoose.connect(
  "mongodb+srv://Shoaib:Shoaib@cluster0-7mkmd.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  err => {
    if (!err) console.log("MONGO DB connection Successfull . ");
    else console.log(JSON.stringify(err, undefined, 2));
  }
);
=======
module.exports = mongoose.connect('mongodb://tushar:abc123@ds263307.mlab.com:63307/stepup', { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log("MONGO DB connection Successfull . ");
    else
        console.log(JSON.stringify(err, undefined, 2));
})
>>>>>>> b47f01e1af062e2b77f09c6987813d341db8182e
