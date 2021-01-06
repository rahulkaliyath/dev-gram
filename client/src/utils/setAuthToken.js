import axios from 'axios';

export const setAuthToken = (token) => {
    if (token){
        axios.defaults.headers.common['auth-token'] = token;
        console.log(" tpken set")
    }
    else{
        delete  axios.defaults.headers.common['auth-token'];
    }
};