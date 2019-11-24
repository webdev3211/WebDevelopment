import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (

        <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1"></i>
                Edit Profile
            </Link>
            <span style={{ color: 'black', fontWeight: 'bold', height: '100%' }}> | </span>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1"></i>
                Add Experience
            </Link>
            <span style={{ color: 'black', fontWeight: 'bold', height: '100%' }}> | </span>

            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1"></i>
                Add Education
            </Link>
            <span style={{ color: 'black', fontWeight: 'bold', height: '100%' }}> | </span>

            <Link to="/add-project" className="btn btn-light">
                <i className="fas fa-tasks text-info mr-1"></i>
                Add Project
            </Link>
            <span style={{ color: 'black', fontWeight: 'bold', height: '100%' }}> | </span>

            <Link to="/add-exam" className="btn btn-light">
                <i className="fas fa-newspaper text-info mr-1"></i>
                Add Exam
            </Link>
            <span style={{ color: 'black', fontWeight: 'bold', height: '100%' }}> | </span>

            <Link to="/add-paper" className="btn btn-light">
                <i className="fas fa-hand-paper-o text-info mr-1"></i>
                Add Paper
            </Link>

        </div>

    )
}


export default ProfileActions;