import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPaper } from '../../actions/profileActions';

class AddPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            issuer: '',
            current: false,
            desc: '',
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
            title: this.state.title,
            issuer: this.state.issuer,
            url: this.state.url,
            desc: this.state.desc
        };

        this.props.addPaper(eduData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    render() {
        const { errors } = this.state;

        return (
            <div className="add-paper" style={{ marginBottom: '100px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
              </Link>
                            <h1 className="display-4 text-center">Add Paper</h1>
                            <p className="lead text-center">
                                Add paper which you have published or have copyright
              </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="* issuer"
                                    name="issuer"
                                    value={this.state.issuer}
                                    onChange={this.onChange}
                                    error={errors.issuer}
                                />

                                <TextFieldGroup
                                    placeholder="* url"
                                    name="url"
                                    value={this.state.url}
                                    onChange={this.onChange}
                                    error={errors.url}
                                />

                                <TextAreaFieldGroup
                                    placeholder="issuer Description"
                                    name="desc"
                                    value={this.state.desc}
                                    onChange={this.onChange}
                                    error={errors.desc}
                                    info="Tell us about the the issuer"
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

AddPaper.propTypes = {
    addPaper: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addPaper })(
    withRouter(AddPaper)
);
