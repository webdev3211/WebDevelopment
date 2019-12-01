import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import classnames from 'classnames';
import axios from 'axios';

import SelectListGroup from "../../common/SelectListGroup";


class editcampusAmbassador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [],
            stunames: [],
            name: '',
            options: [],
            studentname: '',
        }

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {

        const { id } = this.props.match.params;

        axios.get(`/admin/institutes/${id}`).then(ins => {
            this.setState({
                students: ins.data.studentId,
                name: ins.data.name,

            })

            var namesarr = [];

            for (var i = 0; i < this.state.students.length; i++) {
                axios.get(`/profile/user/${this.state.students[i]}`).then(data => {
                    // namesarr[i] = data.user.name;
                    namesarr.push(data.data.user.name)

                    this.setState({
                        stunames: namesarr
                    })
                })

            }




            // console.log(ins);
        })
    }


    onClick(studentId) {
        // console.log(studentId);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        // console.log(e.target.value);

    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(e);
        // console.log(this.state.studentname);

        const { id } = this.props.match.params;

        var index = this.state.stunames.indexOf(this.state.studentname);

        const data = {
            campusAmbassador: this.state.studentname,
            studentId: this.state.students[index]
        }

        axios
            .put(`/admin/addCampusAmbassador/${id}`, data)
            .then(res =>
                this.props.history.push('/admin/campusAmbassador')
            )
            .catch(err =>
                console.log(err)
            );

    }

    render() {

        const { students } = this.state;
        const { stunames } = this.state;

        const selectOptions = stunames.map((option, i) => (

            <option key={students[i]} value={option}>
                {option}
            </option>
        ));

        return (
            <div className="text-center container">

                <h1 className="text-center" style={{ marginTop: "-50px" }}>
                    {this.state.name}
                </h1>
                {/* <ul>
                    {this.state.students.map(stu => (
                        <li key={stu}>
                            {stu}
                        </li>
                    ))}

                </ul> */}

                <h3>Choose campus ambassador from the list</h3>

                {/* <ul>
                    {this.state.stunames.map((stu, i) => (
                        <button key={students[i]}>
                            {stu}
                        </button>
                    ))}

                </ul> */}

                <form onSubmit={this.onSubmit}>


                    <select
                        className="form-control form-control-lg"
                        name="studentname"
                        value={this.state.studentname}
                        onChange={this.onChange}>
                        {selectOptions}
                    </select>

                    <input type="submit" className="btn btn-info btn-block mt-4" />


                </form>


                {/* {this.state.students} */}
            </div>
        )
    }
}



editcampusAmbassador.propTypes = {

    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors,
});

export default connect(mapStateToProps, {})(
    withRouter(editcampusAmbassador)
);

