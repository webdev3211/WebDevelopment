const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/stepup', { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log("MONGO DB connection Successfull . ");
    else
        console.log(JSON.stringify(err, undefined, 2));
})