import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromHTML, EditorState, ContentState } from 'draft-js';
// import { convertToHTML } from 'draft-convert';

import { editthiscourse, getCurrentCourse } from "../../../actions/admin/courseAction";

import axios from 'axios';
import Moment from 'react-moment';

class editCourse extends Component {
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
            // regLink: '',
            file: '',
            errors: {},
            data: {},
            // editorState: EditorState.createEmpty()
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onChange2 = this.onChange2.bind(this);


    }



    componentDidMount() {
        const { id } = this.props.match.params;
        // console.log(id);
        // let data = this.props.getCurrentCourse(id);
        // console.log(data);


        axios.get(`/admin/course/${id}`).then(course => {
            // this.setState({ data: course.data });
            // console.log(course);

            // const courseData = this.state.data;
            // console.log(this.state.options.selected);

            this.setState({
                name: course.data.name,
                duration: course.data.duration,
                startDate: course.data.startDate,
                endDate: course.data.endDate,
                regLastDate: course.data.regLastDate,
                venue: course.data.venue,
                fee: course.data.fee,
                desc: course.data.desc
            });

            console.log(course);


        });




    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }


    }

    onChange2(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeEditor(e) {
        // if (this.state.desc !== null) {
        //     e.blocks[0].text = this.state.desc;
        // }
        this.setState({ desc: e.blocks[0].text });
    }

    onSubmit(e) {
        e.preventDefault();

        const newCourse = {
            name: this.state.name,
            duration: this.state.duration,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            venue: this.state.venue,
            regLastDate: this.state.regLastDate,
            fee: this.state.fee,
            desc: this.state.desc,
            // regLink: this.state.regLink
            // file: this.state.,
            // errors: {}
        };

        const { id } = this.props.match.params;
        // console.log(newCourse);
        this.props.editthiscourse(id, newCourse, this.props.history);
        // console.log(this.state.errors);
    }

    render() {


        const { errors } = this.state;
        // console.log('Props: ', this.props);
        // console.log('State: ', this.state);


        return (
            <div>
                <h1 className="text-center" style={{ marginTop: "-50px" }}>
                    Edit Course
          {/* <p style={{ fontSize: "30px" }}>
                        <small>Edit your course</small>
                    </p> */}
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
                                    value={this.state.name}

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
                                    onChange={this.onChangeEditor}

                                    id="desc"
                                    name="desc"
                                    // value={this.state.desc}
                                    // defaultEditorState={this.state.editorState}


                                    placeholder="Program Description..."
                                    style={{ height: '200px' }}
                                />

                                {/* <textarea
                                    id="desc"
                                    name="desc"
                                    value={this.state.desc}
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
                                    value={this.state.fee}

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
                                    value={this.state.duration}

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
                                    value={this.state.startDate}

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
                                    value={this.state.endDate}

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
                                    value={this.state.regLastDate}

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
                                <input
                                    value={this.state.venue}

                                    onChange={this.onChange}
                                    type="text"
                                    id="venue"
                                    className="form-control"
                                    name="venue"
                                    placeholder="College Name/City Name.."
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
                                    //    value={this.state.file}

                                    onChange={this.onChange}
                                    type="file"
                                    id="file"
                                    className="form-control"
                                    name="file"
                                />
                            </div>
                        </div>
                        <br />

                        {/* <div className="row">
                                    <div className="col-md-3 boldy">
                                        <label htmlFor="country">Country</label>
                                    </div>
                                    <div className="col-md-9">
                                        <select id="country" name="country">
                                            <option value="australia">Australia</option>
                                            <option value="canada">Canada</option>
                                            <option value="usa">USA</option>
                                        </select>
                                    </div>
                                </div> */}
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

editCourse.propTypes = {
    editthiscourse: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentCourse, editthiscourse })(
    withRouter(editCourse)
);
