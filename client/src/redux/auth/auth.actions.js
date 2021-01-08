import {authActionTypes} from './auth.types';
import {profileActionTypes} from '../profile/profile.types';
import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import { setAuthToken} from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {

    try {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    // else{
    //     throw  'ERROR';
    // }
    
        
        const res = await axios.get('api/auth');

        dispatch({
            type: authActionTypes.USER_LOADED,
            payload: res.data
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: authActionTypes.AUTH_ERROR
        });
    }

}

export const registerUser = (name,email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({name,email,password});
    try {
        
        const resp = await axios.post('api/users', body ,config);

        dispatch({
            type: authActionTypes.REGISTER_SUCCESS,
            payload:resp.data
        });
        


    } catch (error) {

        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        console.log(error)
        dispatch({
            type: authActionTypes.REGISTER_FAIL
        });
    }
};


export const loginUser = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({email,password});
    try {
        
        const resp = await axios.post('api/auth', body ,config);

        dispatch({
            type: authActionTypes.LOGIN_SUCCESS,
            payload:resp.data
        });

        dispatch(loadUser());
        


    } catch (error) {

        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger',5000)));
        }
        console.log(error)
        dispatch({
            type: authActionTypes.LOGIN_FAIL
        });
    }
};


export const logout = () => dispatch => {

    dispatch({
        type: authActionTypes.LOGOUT_SUCCESS
    });

    dispatch({
        type: profileActionTypes.CLEAR_PROFILE
    });
};