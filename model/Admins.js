const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: "EMAIL IS REQUIRED",
        index: { unique: true }
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: 8
    },
    phoneNo: {
        type: Number,
        required: "Phone Number is required",
        minlength: 10
    },
    saltSecret: String
});

AdminSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (!err) {
                    this.password = hash;
                    this.saltSecret = salt;
                    next();
                }
            });
        }
    });
})


const AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;