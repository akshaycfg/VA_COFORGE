import { httpClient } from '../constant'
import { createAction } from '@reduxjs/toolkit';

export const loginAction = createAction("AUTH.LOGIN");
export const loginErrorAction = createAction("AUTH.LOGIN_ERROR");
export const loginResetAction = createAction("AUTH.LOGIN_RESET");

export const loginAsync = (loginData) => {
    return (dispatch) => {
        httpClient
            .get("/todos/1", loginData)
            .then((response) => {
              console.log(response)
                if (response) {
                    dispatch(loginAction(response));
                }
            })
            .catch((reason) => {
                dispatch(loginErrorAction(reason.response));
            });
    };
};
