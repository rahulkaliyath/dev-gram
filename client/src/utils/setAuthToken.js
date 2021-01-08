import axios from 'axios';

export const setAuthToken = (token) => {
    if (token){
        axios.defaults.headers.common['auth-token'] = token;
        axios.defaults.baseURL = "http://localhost:5000";
    }
    else{
        delete  axios.defaults.headers.common['auth-token'];
    }
};