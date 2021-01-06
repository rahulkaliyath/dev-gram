import React, { useState, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link , withRouter} from 'react-router-dom';
import {createProfile} from '../../redux/profile/profile.actions';


const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  };


const CreateProfile = ({createProfile, history ,edit}) => {

    const [formData, setFormData] = useState(initialState);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
      } = formData;

    const handleChange = event => {
        const {name, value} = event.target;

        setFormData({...formData, [name]:value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData)
        createProfile(formData,history,false);
    }

    return (
        <div>
        <h1 className="large text-primary">
        Create Your Profile
      </h1> 
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small> * = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" onChange={handleChange} value={company}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" onChange={handleChange} value={website} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={handleChange} value={location} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" onChange={handleChange} value={skills}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={handleChange} 
            value={githubusername}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" onChange={handleChange} value={bio} ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light"  onClick={() => toggleSocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

       {displaySocialInputs &&  (
            <Fragment>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" onChange={handleChange} value={twitter} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" onChange={handleChange} value={facebook}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" onChange={handleChange} value={youtube} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" onChange={handleChange} value={linkedin}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" onChange={handleChange} value={instagram}/>
        </div>
        
     
     
      </Fragment>
      )
       }
       <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
    </div>
    )
};

export default connect(null,{createProfile})(withRouter(CreateProfile));