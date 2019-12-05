import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
// import ImageUploader from 'react-images-upload';


import { createnewcourse } from "../../../actions/admin/courseAction";


import SelectListGroup from "../../common/SelectListGroup";
import axios from 'axios';

class createCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      duration: "",
      startDate: "",
      endDate: "",
      venue: "",
      regLastDate: "",
      fee: "",
      desc: "",

      options: [],
      // regLink: '',
      file: '',
      errors: {},



    };


    // this.onDrop = this.onDrop.bind(this);



    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEditor = this.onChangeEditor.bind(this);

  }


  // onDrop(file) {
  //   this.setState({
  //     file: this.state.file.concat(file),
  //   });
  //   // console.log(this.state.file);
  // }

  componentDidMount() {
    console.log("heelo");
    axios.get("/admin/institutes").then(ins => {
      this.setState({ options: ins.data });
      // console.log(this.state.options.selected);
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeEditor(e) {
    // console.log(e.blocks[0].text);
    this.setState({ desc: e.blocks[0].text });
  }

  onChange2(e) {
    this.setState({
      file: e.target.files[0]
    })
  }

  onSubmit = async e => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('name', this.state.name);
    formData.append('duration', this.state.duration);
    formData.append('startDate', this.state.startDate);
    formData.append('endDate', this.state.endDate);
    formData.append('venue', this.state.venue);
    formData.append('regLastDate', this.state.regLastDate);
    formData.append('fee', this.state.fee);
    formData.append('desc', this.state.desc);

    try {

      const res = await axios.post('/admin/addCourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      // setUrl(filePath);

      console.log('Course created');

    } catch (err) {

      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }

    }

    // console.log(newCourse);
    // this.props.createnewcourse(newCourse, this.props.history);
    // console.log(this.state.errors);
  }

  render() {
    // console.log(this.props);

    const { errors } = this.state;
    // const { contentState } = this.state;

    const { options } = this.state;
    // options.unshift(
    //   { label: 'Select Venue', value: 'Select Venue' },
    // )

    return (
      <div>
        <h1 className="text-center" style={{ marginTop: "-50px" }}>
          Create a New Course
          <p style={{ fontSize: "30px" }}>
            <small>Host a new workshop</small>
          </p>
        </h1>

        <br />

        <div className="container" style={{ marginBottom: "100px" }}>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="name">Course Title</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  placeholder="Course Title to display.."
                />
                {/* <div className="invalid-feedback">{errors.name}</div> */}
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="desc">Description</label>
              </div>
              <div className="col-md-9">
                <Editor


                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  id="desc"
                  name="desc"

                  onChange={this.onChangeEditor}
                  placeholder="Program Description..."
                  style={{ height: '200px' }}
                />

                {/* <textarea
                  id="desc"
                  name="desc"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Program Description.."
                  style={{ height: "200px" }}
                ></textarea> */}
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="row">
              <div className="col-md-3 boldy">

              </div>
              <div className="col-md-9">
                <hr />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="fee">Fee(₹):</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="number"
                  id="fee"
                  className="form-control"
                  name="fee"
                  placeholder="Registration fee.."
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="duration">Duration:</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="text"
                  id="duration"
                  className="form-control"
                  name="duration"
                  placeholder="Duration.."
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="startDate">Course Start Date:</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="date"
                  id="startDate"
                  className="form-control"
                  name="startDate"
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="endDate">Course End Date:</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="date"
                  id="endDate"
                  className="form-control"
                  name="endDate"
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="regLastDate">Registration Last Date:</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange}
                  type="date"
                  id="regLastDate"
                  className="form-control"
                  name="regLastDate"
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="venue">Venue:</label>
              </div>
              <div className="col-md-9">
                {/* <input
                  onChange={this.onChange}
                  type="text"
                  id="venue"
                  className="form-control"
                  name="venue"
                  placeholder="College Name/City Name.."
                />
              */}


                <SelectListGroup
                  name="venue"
                  placeholder="Enter venue"
                  value={this.state.venue}
                  error={errors.venue}
                  onChange={this.onChange}
                  options={options}
                  className="form-control"
                />
              </div>

            </div>
            <br />

            <div className="row">
              <div className="col-md-3 boldy">
                <label htmlFor="file">Cover Image:</label>
              </div>
              <div className="col-md-9">
                <input
                  onChange={this.onChange2}
                  type="file"
                  id="file"
                  className="form-control"
                  name="file"
                />
              </div>




            </div>
            <br />


            <div className="row">
              <input
                onChange={this.onChange}
                type="submit"
                className="btn btn-block text-center designedbutton"
                style={{ alignItems: "center", marginTop: "30px" }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

createCourse.propTypes = {
  // createCourse: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(mapStateToProps, { createnewcourse })(
  withRouter(createCourse)
);
