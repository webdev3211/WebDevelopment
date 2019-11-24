import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExam } from '../../actions/profileActions';

class AddExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            score: '',
            url: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const eduData = {
            name: this.state.name,
            score: this.state.score,
            url: this.state.url,
        };

        this.props.addExam(eduData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    render() {
        const { errors } = this.state;

        return (
            <div className="add-exam" style={{ marginBottom: '100px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
              </Link>
                            <h1 className="display-4 text-center">Add Exam</h1>
                            <p className="lead text-center">
                                Add exam details which you have appeared in
              </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    placeholder="* score"
                                    name="score"
                                    type="number"
                                    value={this.state.score}
                                    onChange={this.onChange}
                                    error={errors.score}
                                />


                                <TextFieldGroup
                                    placeholder="* url"
                                    name="url"
                                    value={this.state.url}
                                    onChange={this.onChange}
                                    error={errors.url}
                                />


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

AddExam.propTypes = {
    addExam: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExam })(
    withRouter(AddExam)
);
