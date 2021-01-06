import {authActionTypes} from './auth.types';

const INITIAL_STATE ={
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){


        case authActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }

        
        case authActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            }

        case authActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                token:action.payload.token,
                isAuthenticated: true,
                loading:false
            }

        case authActionTypes.AUTH_ERROR:
        case authActionTypes.LOGIN_FAIL:
        case authActionTypes.LOGOUT_SUCCESS:
        case authActionTypes.REGISTER_FAIL:
        case authActionTypes.ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                user:null
            }


        default:
            return state
                
    }
};

export default authReducer;