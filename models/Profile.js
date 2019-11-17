const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        // required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    },
    current: {
        type: Boolean,
        default: false
    },
});

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        // required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    },
    current: {
        type: Boolean,
        default: false
    },
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    }
});

const examSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    }

})

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    }
})

// const socialSchema = new mongoose.Schema({


//     youtube: {
//         type: String
//     },
//     twitter: {
//         type: String
//     },
//     facebook: {
//         type: String
//     },
//     linkedin: {
//         type: String
//     },
//     instagram: {
//         type: String
//     },




// })

const ProfileSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },



    phoneNo: {
        type: String,
        // required: true
    },
    dob: {
        type: Date,
        // required: true

    },
    currentCity: {
        type: String
    },
    homeCity: {
        type: String
    },
    bio: {


        type: String
    },
    profilephoto: {
        type: String,
        default: 'default-avatar.png'
    },

    followers: {
        type: String,
        default: 0

    },
    following: {
        type: String,
        default: 0
    },

    education: {
        type: [educationSchema]
    },
    experience: {
        type: [experienceSchema]
    },
    projects: {
        type: [projectSchema]
    },
    exams: {
        type: [examSchema]
    },
    papers: {
        type: [paperSchema]
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);