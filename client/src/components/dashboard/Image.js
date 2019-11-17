import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// // import { withRouter } from 'react-router-dom';
// import Moment from 'react-moment';
// import { deleteEducation } from '../../actions/profileActions';

class Image extends Component {

 

    render() {

        const boxStyle = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'
        }
        
        const imageurl = this.props.image;

       
     
        
            return (
                
                <img style={boxStyle} align="left" className="fb-image-profile thumbnail"  src={imageurl} alt="Profile example" />


            )
        }
    


}



export default Image;