import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class AdminDashboard extends Component {
    render() {




        return (
            <div className="container" style={{ marginLeft: '110px' }} >
                <h1 className="text-center" style={{ marginTop: '-50px' }}>
                    <b>Activity Panel for Admin</b>

                </h1>

                <br /><br />

                <div className="text-center">


                    <div className="row adminpanel">

                        <div className="card text-center" style={{ width: '400px' }}>
                            <div className="card-body ">
                                <h5 className="card-title">Add Course</h5>
                                <Link to="/admin/createCourse" className="btn btn-primary">Click Here</Link>
                            </div>
                        </div>


                        <div className="card text-center" style={{ width: '400px' }}>
                            <div className="card-body ">
                                <h5 className="card-title">Add Material</h5>
                                <Link to="/" className="btn btn-primary">Click Here</Link>
                            </div>
                        </div>


                        <div className="card text-center" style={{ width: '400px' }}>
                            <div className="card-body ">
                                <h5 className="card-title">View All Registrations</h5>
                                <Link to="/" className="btn btn-primary">Click Here</Link>
                            </div>
                        </div>


                        <div className="card text-center" style={{ width: '400px' }}>
                            <div className="card-body ">
                                <h5 className="card-title">Add/View Campus Ambassador</h5>
                                <Link to="/admin/campusambassador" className="btn btn-primary">Click Here</Link>
                            </div>
                        </div>


                        {/* <div className="card text-center" style={{ width: '400px' }}>
                            <div className="card-body ">
                                <h5 className="card-title">View Workshops</h5>
                                <Link to="/" className="btn btn-primary">Click Here</Link>
                            </div>
                        </div> */}



                    </div>


                </div>

            </div>


        )
    }
}

export default AdminDashboard;