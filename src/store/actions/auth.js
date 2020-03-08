import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authStartSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_START_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logOut = () => {
    debugger;
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, parseInt(expirationTime, 10) * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-CFDIImzOW5D5E1Y0JmeFHUkl4Z-OA-Q';
        if (!isSignup)
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-CFDIImzOW5D5E1Y0JmeFHUkl4Z-OA-Q';

        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authStartSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeOut(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};