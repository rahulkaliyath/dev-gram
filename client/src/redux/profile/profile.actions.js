import {profileActionTypes} from './profile.types';
import {setAlert} from '../alert/alert.actions';
import axios from 'axios';
import { authActionTypes } from '../auth/auth.types';

export const getCurrentProfile = () => async dispatch => {

    try{
        const res = await axios.get('api/profile/me');

        dispatch({
            type: profileActionTypes.GET_PROFILE,
            payload: res.data
        });
    }
    catch(err)
    {
        dispatch({
            type:profileActionTypes.PROFILE_ERROR,
            payload: {msg:err.response.data.msg, status : err.response.status}
        });
    }
};

export const createProfile = (formData, history, edit =false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    try{
        const resp = await axios.post('api/profile', formData ,config);

        dispatch({
            type: profileActionTypes.GET_PROFILE,
            payload:resp.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));

        if(!edit){
            history.push('/dashboard')
        }
    }
    catch(error){
        const errors = error.response.data.errors;
        console.log(error.response)
        console.log(errors)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: {msg:error.response.data.msg, status : error.response.status}
        });
    }
}


export const addExperience = (formData, history ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    try{
        const resp = await axios.put('api/profile/experience', formData ,config);

        dispatch({
            type: profileActionTypes.UPDATE_PROFILE,
            payload:resp.data
        });

        dispatch(setAlert('Experience Added','success'));

       
        history.push('/dashboard')
        
    }
    catch(error){
        const errors = error.response.data.errors;
        console.log(error.response)
        console.log(errors)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: {msg:error.response.data.msg, status : error.response.status}
        });
    }
}


export const addEducation = (formData, history ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    try{
        const resp = await axios.put('api/profile/education', formData ,config);

        dispatch({
            type: profileActionTypes.UPDATE_PROFILE,
            payload:resp.data
        });

        dispatch(setAlert('Education Added','success'));

       
        history.push('/dashboard')
        
    }
    catch(error){
        const errors = error.response.data.errors;
        console.log(error.response)
        console.log(errors)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: {msg:error.response.data.msg, status : error.response.status}
        });
    }
}


export const deleteExperience = id => async dispatch => {
     try{
        const resp = await axios.delete(`api/profile/experience/${id}`);

        dispatch({
            type: profileActionTypes.UPDATE_PROFILE,
            payload:resp.data
        });

        dispatch(setAlert('Experience Removed','success'));
     
    }
    catch(error){
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: {msg:error.response.data.msg, status : error.response.status}
        });
    }
}

export const deleteEducation = id => async dispatch => {
    try{
       const resp = await axios.delete(`api/profile/education/${id}`);

       dispatch({
           type: profileActionTypes.UPDATE_PROFILE,
           payload:resp.data
       });

       dispatch(setAlert('Education Removed','success'));
    
   }
   catch(error){
       const errors = error.response.data.errors;

       if(errors){
           errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
       }
       dispatch({
           type: profileActionTypes.PROFILE_ERROR,
           payload: {msg:error.response.data.msg, status : error.response.status}
       });
   }
}


export const deleteAccount = id => async dispatch => {


      if(window.confirm('Are you sure? This Cannot be undone')){

        try{
        const resp = await axios.delete(`api/profile`);

        dispatch({
            type: profileActionTypes.CLEAR_PROFILE,
            payload:resp.data
        });

        dispatch({
            type: authActionTypes.ACCOUNT_DELETED
        });

        dispatch(setAlert('Account Removed Permenantly','success'));
        
    }
    catch(error){
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: {msg:error.response.data.msg, status : error.response.status}
        });
    }
}
};



export const getAllProfiles = () => async dispatch => {

     try{
      const resp = await axios.get(`api/profile`);

      dispatch({
          type: profileActionTypes.GET_ALL_PROFILES,
          payload:resp.data
      });

  }
  catch(error){
          
      dispatch({
          type: profileActionTypes.PROFILE_ERROR,
          payload: {msg:error.response.data.msg, status : error.response.status}
      });
  }
};


export const getProfileById = userId => async dispatch => {
    
    try{
     const resp = await axios.get(`/api/profile/user/${userId}`);

     dispatch({
         type: profileActionTypes.GET_PROFILE,
         payload:resp.data
     });

 }
 catch(error){
   
     dispatch({
         type: profileActionTypes.PROFILE_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};