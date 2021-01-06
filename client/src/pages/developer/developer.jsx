import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner';
import ProfileItem from '../../components/profile-Item/profileItem';
import { getAllProfiles } from '../../redux/profile/profile.actions';

const Developers = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      {loading ? (
        <WithSpinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};


const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Developers);