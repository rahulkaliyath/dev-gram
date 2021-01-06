import {profileActionTypes} from './profile.types';

const INITIAL_STATE = {
    profile:null,
    profiles : [],
    repos :[],
    loading:true,
    error:{}
};

const profileReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case profileActionTypes.GET_PROFILE:
        case profileActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading:false
            };

        case profileActionTypes.GET_ALL_PROFILES:
            return {
                ...state,
                profiles : action.payload,
                loading : false
            }

        case profileActionTypes.PROFILE_ERROR:
            return {
                ...state,
                loading:false,
                error : action.payload
            };

        case profileActionTypes.CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                repos :[],
                loading:false,
                error:{}
            }

        default:
            return state;

    }
};

export default profileReducer;