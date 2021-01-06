import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/auth/auth.actions';

const Login = ({loginUser, isAuthenticated,profile}) => {

    const [formData, setFormData] = useState({
        password:'',
        email:''
    });

    const {email,password} = formData;

    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }

    const handleChange = event => {
        const {name, value} = event.target;

        setFormData({...formData, [name]:value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        loginUser(email,password);
    }


    return(
        <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={handleChange}
             value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
             value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </div>
    )
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated,
  profile : state.profile
})

export default connect(mapStateToProps,{loginUser})(Login);