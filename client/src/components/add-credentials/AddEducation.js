import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution: '',
            degree: '',
            fromDate: '',
            toDate: '',
            current: false,
            desc: '',
            errors: {},
            disabled: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const eduData = {
            institution: this.state.institution,
            degree: this.state.degree,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            current: this.state.current,
            desc: this.state.desc
        };

        this.props.addEducation(eduData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="add-education" style={{ marginBottom: '100px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
              </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">
                                Add any school or institution where you have had studied in the past or current
              </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* institution"
                                    name="institution"
                                    value={this.state.institution}
                                    onChange={this.onChange}
                                    error={errors.institution}
                                />
                                <TextFieldGroup
                                    placeholder="* degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="fromDate"
                                    type="date"
                                    value={this.state.fromDate}
                                    onChange={this.onChange}
                                    error={errors.fromDate}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="toDate"
                                    type="date"
                                    value={this.state.toDate}
                                    onChange={this.onChange}
                                    error={errors.toDate}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current institution
                  </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Degree Description"
                                    name="desc"
                                    value={this.state.desc}
                                    onChange={this.onChange}
                                    error={errors.desc}
                                    info="Tell us about the the degree"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
    withRouter(AddEducation)
);
