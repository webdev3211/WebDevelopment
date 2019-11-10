const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateProjectInput = require('../../validation/project');
const validateExamInput = require('../../validation/exam');
const validatePaperInput = require('../../validation/paper');



// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));



/* ================================================
// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
================================================ */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);


/* ================================================
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
================================================ */
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});


/* ================================================
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
================================================ */

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


/* ================================================
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
================================================ */
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There is no profile for this user' })
        );
});



/* ================================================================================================
/* ================================================================================================
POST PROFILE, EXPERIENCE, EXAM, PAPER, EDUCATION, PROJECT ROUTES
/* ================================================================================================
/* ================================================================================================



/* ================================================
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
================================================ */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;

        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.phoneNo) profileFields.phoneNo = req.body.phoneNo;
        if (req.body.dob) profileFields.dob = req.body.dob;
        if (req.body.currentCity) profileFields.currentCity = req.body.currentCity;
        if (req.body.homeCity) profileFields.homeCity = req.body.homeCity;




        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;




        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }

                    // Save Profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                });
            }
        });
    }
);


/* ================================================
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
================================================ */
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newExp = {
                company: req.body.company,
                title: req.body.title,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                desc: req.body.desc
            };

            // Add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);



/* ================================================
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
================================================ */
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                institution: req.body.institution,
                degree: req.body.degree,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                desc: req.body.desc,
            };

            // Add to exp array
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);




/* ================================================
// @route   POST api/profile/project
// @desc    Add project to profile
// @access  Private
================================================ */
router.post(
    '/projects',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProjectInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                title: req.body.title,
                url: req.body.url,
                desc: req.body.desc,
            };

            // Add to exp array
            profile.projects.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);


/* ================================================
// @route   POST api/profile/exam
// @desc    Add exam to profile
// @access  Private
================================================ */
router.post(
    '/exams',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExamInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                name: req.body.name,
                score: req.body.score,
                url: req.body.url,
            };

            // Add to exp array
            profile.exams.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);



/* ================================================
// @route   POST api/profile/paper
// @desc    Add paper to profile
// @access  Private
================================================ */
router.post(
    '/papers',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePaperInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                title: req.body.title,
                issuer: req.body.issuer,
                desc: req.body.desc,
                url: req.body.url,
            };

            // Add to exp array
            profile.papers.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);



/* ================================================================================================
/* ================================================================================================
DELTE PROFILE, EXPERIENCE, EXAM, PAPER, EDUCATION, PROJECT ROUTES
/* ================================================================================================
================================================================================================


/* ================================================
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
================================================ */
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);



/* ================================================
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
================================================ */
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);


/* ================================================
// @route   DELETE api/profile/projects/:pro_id
// @desc    Delete projects from profile
// @access  Private
================================================ */
router.delete(
    '/projects/:pro_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.projects
                    .map(item => item.id)
                    .indexOf(req.params.pro_id);

                // Splice out of array
                profile.projects.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);



/* ================================================
// @route   DELETE api/profile/exams/:exm_id
// @desc    Delete exams from profile
// @access  Private
================================================ */
router.delete(
    '/exams/:exm_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.exams
                    .map(item => item.id)
                    .indexOf(req.params.exm_id);

                // Splice out of array
                profile.exams.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);


/* ================================================
// @route   DELETE api/profile/exams/:exm_id
// @desc    Delete exams from profile
// @access  Private
================================================ */
router.delete(
    '/papers/:ppr_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.papers
                    .map(item => item.id)
                    .indexOf(req.params.ppr_id);

                // Splice out of array
                profile.papers.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

/* ================================================
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
================================================ */
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);
module.exports = router;
