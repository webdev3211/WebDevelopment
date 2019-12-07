import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from "react-sidebar";
import SidebarNav from './SidebarNav';

class SidebarComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);


    }


    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }




    render() {



        return (

            <div>
                <button className="navbar-toggler" onClick={() => this.onSetSidebarOpen(true)}>
                    &#9776;
                </button>

                <div>

                </div>

                {
                    (this.state.sidebarOpen) ?

                        <Sidebar
                            sidebar={
                                <SidebarNav />
                            }
                            open={this.state.sidebarOpen}
                            onSetOpen={this.onSetSidebarOpen}
                            styles={{ sidebar: { background: "white" } }}
                        >

                        </Sidebar>
                        : null
                }

            </div>


        );
    }
}

SidebarComponent.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth

})


export default connect(mapStateToProps, {})(SidebarComponent);
