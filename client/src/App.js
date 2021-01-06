import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import Alerts from './components/alerts/alerts';
import {loadUser} from './redux/auth/auth.actions';
import {setAuthToken} from './utils/setAuthToken';
import PrivateRoute from './routing/privateRoute';
import CreateProfile from './pages/create-profile/create-profile';
import EditProfile from './pages/create-profile/edit-profile';
import AddExperience from './components/add-exp-edu/addExperience';
import AddEducation from './components/add-exp-edu/addEducation';
import Developers from './pages/developer/developer';
import profile from './components/profile/profile';
import './App.css';

class App extends React.Component{

  componentDidMount(){
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    this.props.loadUser();
  }

  componentDidUpdate(){
    this.props.loadUser();
  }

  render(){
  return (
    <div>
      <Navbar />
      
      <Switch >

        <Route exact path='/'  component={Home}/>

        <section className='container'>
        <Alerts/>
            <Route exact path='/login'  component={Login}/>
            <Route exact path='/register'  component={Register}/>
            <Route exact path='/developers'  component={Developers}/>
            <Route exact path='/profile/:id'  component={profile}/>
            <PrivateRoute exact path='/dashboard'  component={Dashboard}/>
            <PrivateRoute exact path='/create-profile'  component={CreateProfile}/>
            <PrivateRoute exact path='/edit-profile'  component={EditProfile}/>
            <PrivateRoute exact path='/add-experience'  component={AddExperience}/>
            <PrivateRoute exact path='/add-education'  component={AddEducation}/>
        </section>

      </Switch>
    </div>
  );
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile
})

export default connect(mapStateToProps,{loadUser})(App);
