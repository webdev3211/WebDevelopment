const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    phoneNo: { type: Number },
    dob: { type: Date },
    currentCity: { type: String },
    homeCity: { type: String },
    bio: { type: String }
});

const educationSchema = new mongoose.Schema({
    institution: { type: String },
    degree: { type: String },
    fromDate: { type: Date },
    toDate: { type: Date },
    desc: { type: String },
    photo: { type: String }
});

const experienceSchema = new mongoose.Schema({
    company: { type: String },
    title: { type: String },
    fromDate: { type: Date },
    toDate: { type: Date },
    desc: { type: String },
    photo: { type: String }
});

const projectSchema = new mongoose.Schema({
    Title: { type: String },
    desc: { type: String },
    url: { type: String },
    photo: { type: String }
});

const examSchema = new mongoose.Schema({

    name: { type: String },
    score: { type: Number },
    Url: { type: String },
    photo: { type: String }

})

const paperSchema = new mongoose.Schema({
    title: { type: String },
    issuer: { type: String },
    desc: { type: String },
    url: { type: String },
    photo: { type: String }
})

const UserProfile = new mongoose.Schema({
    userId: { type: String },
    education: { type: [educationSchema] },
    experience: { type: [experienceSchema] },
    internships: { type: [experienceSchema] },
    projects: { type: [projectSchema] },
    exams: { type: [examSchema] },
    papers: { type: [paperSchema] }

})