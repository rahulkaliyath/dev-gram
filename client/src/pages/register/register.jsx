import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../redux/alert/alert.actions';
import {registerUser} from '../../redux/auth/auth.actions';

const Register = ({setAlert,registerUser,isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });


    if(isAuthenticated){
      return <Redirect to='/' />
    }


    const {name,email,password,confirmPassword} = formData;

    const handleChange = event => {
        const {name, value} = event.target;

        setFormData({...formData, [name]:value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (password !== confirmPassword){
            setAlert("passwords does not match","danger");
            return;
        }

        registerUser(name,email,password);
    }

    return(
      
    <div>
         <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required  onChange={handleChange} value={name}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={handleChange} value={email}/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            onChange={handleChange}
            value={confirmPassword}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
    )
};


const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProps,{setAlert,registerUser})(Register);