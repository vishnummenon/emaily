import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');

    // dispatching an action
    dispatch({type: FETCH_USER, payload: response.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data});
}; 