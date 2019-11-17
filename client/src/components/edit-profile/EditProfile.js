import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            currentCity: '',
            homeCity: '',
            phoneNo: '',
            dob: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;



            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.phoneNo = !isEmpty(profile.phoneNo) ? profile.phoneNo : '';
            profile.dob = !isEmpty(profile.dob) ? profile.dob : '';
            profile.currentCity = !isEmpty(profile.currentCity) ? profile.currentCity : '';
            profile.homeCity = !isEmpty(profile.homeCity) ? profile.homeCity : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            profile.social = !isEmpty(profile.social) ? profile.social : {};



            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            //Set component field state
            this.setState({
                handle: profile.handle,
                dob: profile.dob,
                phoneNo: profile.phoneNo,
                currentCity: profile.currentCity,
                homeCity: profile.homeCity,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });

        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            dob: this.state.dob,
            phoneNo: this.state.phoneNo,
            currentCity: this.state.currentCity,
            homeCity: this.state.homeCity,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        console.log(profileData);

        this.props.createProfile(profileData, this.props.history);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        src="https://storage.googleapis.com/lastcampus/default_images/twitterIcon.png"
                        // icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        src="https://storage.googleapis.com/lastcampus/default_images/facebookIcon.png"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        src="https://storage.googleapis.com/lastcampus/default_images/linkedinIcon.png"

                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />



                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        src="https://i.ibb.co/5nbzjw8/youtube.png"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        src="https://storage.googleapis.com/lastcampus/default_images/instagramlogo.png"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }



        return (
            <div className="create-profile">
                <div className="container" style={{ marginBottom: '100px' }}>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />

                                <TextFieldGroup
                                    placeholder="Enter phoneNo"
                                    name="phoneNo"
                                    value={this.state.phoneNo}
                                    onChange={this.onChange}
                                    error={errors.phoneNo}
                                    info=""
                                />

                                <TextFieldGroup
                                    name="dob"
                                    type="date"
                                    value={this.state.dob}
                                    onChange={this.onChange}
                                    error={errors.dob}
                                />

                                <TextFieldGroup
                                    placeholder="currentCity"
                                    name="currentCity"
                                    value={this.state.currentCity}
                                    onChange={this.onChange}
                                    error={errors.currentCity}
                                    info=""
                                />



                                <TextFieldGroup
                                    placeholder="homeCity"
                                    name="homeCity"
                                    value={this.state.homeCity}
                                    onChange={this.onChange}
                                    error={errors.homeCity}
                                    info=""
                                />






                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                  </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
