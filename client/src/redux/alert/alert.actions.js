import {alertActionTypes} from './alert.types';
import {v4 as uuid} from 'uuid';

export const setAlert = (msg,alertType,timeout = 3000) => dispatch => {
    const id = uuid();
    dispatch({
        type: alertActionTypes.SET_ALERT,
        payload: {msg,alertType,id}
    })

    setTimeout(() => dispatch({
        type: alertActionTypes.REMOVE_ALERT,
        payload:id
    }),timeout);
};
