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
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    }
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
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true
    }
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

const socialSchema = new mongoose.Schema({


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
    },




})

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

    // email: {
    //     type: String
    // },
    // name: {
    //     type: String
    // },
    // password: {
    //     type: String
    // },
    phoneNo: {
        type: Number,
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
        type: [socialSchema]
    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);