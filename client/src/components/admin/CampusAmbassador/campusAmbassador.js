import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";


class campusAmbassador extends Component {


    constructor(props) {
        super(props);

        this.state = {
            // regLink: '',
            // file: '',
            institutes: [],
            errors: {}
        };
    }

    componentDidMount() {
        // if (this.props.admin.isAdminAuthenticated) {
        //     this.props.history.push('/');
        // }
        axios.get('/admin/institutes').then(ins => {
            this.setState({ institutes: ins.data });
            // console.log(ins);
            // for (var i = 0; i < ins.data.length; i++) {
            //     this.institutes.push(ins.data[i]);
            // }

        });


        // console.log(this.state.institutes);


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onEditInstituteCampusAmbassador(instituteId) {

        // axios.put('/admin/addCampusAmbassador/${id}', (req, res) => {

        // })
        // console.log(id);

        this.props.history.push(`/admin/editCampusAmbassador/${instituteId}`);



    }

    onDeleteCampusAmbassador(id) {

        if (window.confirm("Are you sure? This can not be undone")) {

            axios.put(`/admin/removeCampusAmbassador/${id}`, "")
                .then(res =>
                    this.props.history.push('/admin/campusAmbassador')
                )
                .catch(err =>
                    console.log(err)
                );
        } else {
            console.log('Delete ambasador operation cancelled')
        }

    }

    render() {

        const boxStyle = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px',
            // backgroundColor: '#242729'
            // backgroundColor: '#f1f1f1',
            marginBottom: '150px'
        }


        const { errors } = this.state;
        const { institutes } = this.state;

        // console.log(institutes);


        const campusambassadors = institutes.map(ins => (
            <tr key={ins._id}>
                <td style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
                    {ins.name}</td>
                <td>{ins.campusAmbassador}</td>
                <td> <button style={{ color: 'green', marginRight: '25px' }}
                    onClick={this.onEditInstituteCampusAmbassador.bind(this, ins._id)}
                >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                </button>

                    <button style={{ color: 'red' }}
                        onClick={this.onDeleteCampusAmbassador.bind(this, ins._id)}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>




            </tr>
        ))



        return (
            <div >
                <img src="https://i.ibb.co/b2pvZ8R/Cmps-Ambassdr-Mob.png" style={{ height: '60%', width: '60%', marginBottom: '80px', marginLeft: '300px' }} />

                <h1 className="text-center" style={{ marginTop: "-50px" }}>
                    Campus Ambassadors

                </h1>

                <br />

                <div className="container" style={boxStyle}>

                    <table className="table">
                        <thead>
                            <tr style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
                                <th>Institute Name</th>
                                <th>Ambassador</th>
                                <th></th>
                            </tr>
                            {campusambassadors}
                        </thead>
                    </table>
                    <hr />

                </div>

            </div>
        )
    }
}



campusAmbassador.propTypes = {
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors
});

export default connect(mapStateToProps, {})(
    withRouter(campusAmbassador)
);
