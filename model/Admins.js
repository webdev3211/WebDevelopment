const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // index: { unique: true }
    },
    password: {
        type: String,
        // required: "Password is required",
        required: true,
        // minlength: 8
    },
    phoneNo: {
        type: String,
        required: true
        // minlength: 10
    },

    saltSecret: String
});

// AdminSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         if (!err) {
//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if (!err) {
//                     this.password = hash;
//                     this.saltSecret = salt;
//                     next();
//                 }
//             });
//         }
//     });
// })



module.exports = Admin = mongoose.model("admin", AdminSchema);
