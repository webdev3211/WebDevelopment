import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
  photoUpload
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Courses from "./Courses";
import Education from "./Education";
import Exam from "./Exam";
import Project from "./Project";
import Paper from "./Paper";
// import Image from './Image';
import FileUpload from "./FileUpload";

//File uppload
// import { storage } from '../../firebase';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
  }

  // handleChange = e => {
  //     if (e.target.files[0]) {
  //         const image = e.target.files[0];

  //         this.setState(() => ({ image }));
  //         console.log(image);
  //     } else {
  //         console.log('Hello world');
  //     }
  // }

  //File upload using firebase
  // handleUpload = () => {
  //     const { image } = this.state;
  //     const uploadTask = storage.ref(`images/${image.name}`).put(image);

  //     // uploadTask.on('state_changed', progress, error, completed)
  //     uploadTask.on('state_changed',
  //         (snapshot) => {

  //             const progress = Math.round(((snapshot.bytesTransferred) / (snapshot.totalBytes)) * 100);
  //             this.setState({ progress });
  //         }, (error) => {
  //             console.log(error);
  //         },
  //         () => {
  //             storage.ref('images').child(image.name).getDownloadURL()
  //                 .then(image => {
  //                     const downloadUrl = image;

  //                     this.setState({ url: downloadUrl });
  //                     console.log('firebase me gyaa');
  //                     // console.log(url);

  //                 }
  //                 ).then(() => {
  //                     console.log(`updating in db`);

  //                     const imgg = this.state.url;
  //                     if (imgg !== '') {
  //                         this.props.photoUpload(imgg);
  //                     }

  //                 });
  //         }
  //     )
  // }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    // const style = {
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     // justifyContent: 'center'
    // }

    const boxStyle = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      padding: "10px"
    };

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    // const profilefollowers = profile.followers;
    // const profilefollowing = profile.following;
    // console.log(profile);

    let dashboardContent;
    let pic;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // console.log();

      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <br />
            <br />
            {/* <div className="" style="display: flex;"> */}
            <p
              className="lead text-muted "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </span>
              <br />
              <span>
                Institute: <strong>{profile.institute}</strong>, class:{" "}
              </span>
            </p>
            {/* </div> */}
            <ProfileActions />

            <Courses course={profile.user._id} />
            <Experience experience={profile.experience} />

            <Education education={profile.education} />

            <Exam exams={profile.exams} />

            <Project projects={profile.projects} />

            <Paper papers={profile.papers} />

            <div style={{ marginBottom: "60px" }} />
            {/* <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                            Delete My Account
                        </button> */}
          </div>
        );

        pic = (
          // <Image image = {profile.profilephoto} />
          <FileUpload profilephoto={profile.profilephoto} />
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-sm btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div
        className="dashboard"
        style={{ marginBottom: "1000px", marginLeft: "18px" }}
      >
        <div className="row">
          <div className="fb-profile col-md-9" style={{ marginLeft: "20px" }}>
            <img
              align="left"
              style={boxStyle}
              className="fb-image-lg"
              src="https://i.ibb.co/8Xx6yD8/7588568-7366b7523095e196beaf0434b81e8e81189b385f.jpg"
              alt="Profile example"
            />

            {/* <input type="file" onChange={this.handleChange} />
                        <button onClick={this.handleUpload}>Upload </button> */}

            {pic}

            <div className="fb-profile-text mt-4">
              {/* <h1>{user.name}</h1> */}
              {/* <span className="pull-right clearfix">Following: {profilefollowing} | Followers: {profilefollowers}</span> */}

              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  photoUpload: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  photoUpload
})(Dashboard);
