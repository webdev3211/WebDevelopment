import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { setCurrentAdmin, logoutAdmin } from './actions/admin/authadminActions';


import store from './store';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import AddProject from './components/add-credentials/AddProject';
import AddExam from './components/add-credentials/AddExam';
import AddPaper from './components/add-credentials/AddPaper';


//Admin
import adminRegister from './components/admin/auth/adminRegister';
import adminLogin from './components/admin/auth/adminLogin';
import AdminDashboard from './components/admin/admindashboard/AdminDashboard';
import createCourse from './components/admin/courses/createCourse';
import allCourses from './components/admin/courses/allCourses';






import PrivateRoute from './components/common/PrivateRoute';
import PrivateRouteAdmin from './components/common/PrivateRouteAdmin';



import './App.css';
import { clearCurrentProfile } from './actions/profileActions';


//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  ///Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());

    window.location.href = "/login";
  }

}



//Check for token for admin
if (localStorage.adminjwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.adminjwtToken);

  ///Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.adminjwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setCurrentAdmin(decoded));


  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutAdmin());
    //clear current profile
    // store.dispatch(clearCurrentProfile());

    window.location.href = "/admin/login";
  }

}


class App extends Component {


  render() {
    return (

      <Provider store={store}>

        <Router>
          <div className="App">

            <Navbar />


            <Route exact path="/" component={Landing} />


            <div style={{ marginTop: '120px' }}>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />


              {/* Admin */}
              <Route exact path="/admin/register" component={adminRegister} />
              <Route exact path="/admin/login" component={adminLogin} />


              <Switch>
                <PrivateRouteAdmin exact path="/admin/dashboard" component={AdminDashboard} />

              </Switch>

              <Switch>
                <PrivateRouteAdmin exact path="/admin/createCourse" component={createCourse} />

              </Switch>


              <Switch>
                <PrivateRouteAdmin exact path="/admin/courses" component={allCourses} />

              </Switch>


              {/* //  */}


              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />

              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />

              </Switch>


              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>


              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-project" component={AddProject} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-paper" component={AddPaper} />
              </Switch>


              <Switch>
                <PrivateRoute exact path="/add-exam" component={AddExam} />
              </Switch>

            </div>


            <Footer />

          </div>

        </Router>


      </Provider>

    );
  }

}

export default App;
