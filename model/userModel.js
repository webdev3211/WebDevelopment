const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    saltSecret : String
});

UserSchema.pre('save', function (next) {
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


const UserModel = mongoose.model('USER', UserSchema);

module.exports = UserModel;