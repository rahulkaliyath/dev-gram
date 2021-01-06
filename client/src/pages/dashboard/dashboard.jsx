import React, { Fragment } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile , deleteAccount} from '../../redux/profile/profile.actions';
import DashboardActions from '../../components/dashboard-actions/dashboardActions';
import Experience from '../../components/dash-exp-edu/dashExperience';
import Education from '../../components/dash-exp-edu/dashEducation';
import WithSpinner from '../../components/with-spinner/with-spinner';

class Dashboard extends React.Component{
    
    
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render(){

        const {profile , loading} =this.props.profile;
        const {user} = this.props.auth;
        return(
            <div>
            {loading && profile === null ? <WithSpinner /> 
            : <Fragment>
                <h1 className='large text-primary'>Dashboard</h1>
                <p className='lead'>
                <i className='fas fa-user'></i> Welcome {user && user.name}
                </p>
                {profile !== null ?  
                <Fragment> 
                    <DashboardActions /> 
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education} />

                    <div className="my-2">
            <button className="btn btn-danger" onClick={() => this.props.deleteAccount()}>
              <i className="fas fa-user" /> Delete My Account
            </button>
          </div>
                    </Fragment>
                : <Fragment>
                    <p>You have not yet setup a profile, please add some info.</p>
                    <Link to='/create-profile' className='btn btn-primary my-1' edit={true}>
                        Create Profile
                    </Link>
                    </Fragment>}
                </Fragment>}

           
            </div>
        )
    }
};

const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard);