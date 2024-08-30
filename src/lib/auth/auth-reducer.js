import { createReducer } from '@reduxjs/toolkit';
import { loginAction, loginErrorAction } from "./auth-action";

export const loginReducer = createReducer({}, (builder) => {
  builder
    .addCase(loginAction, (state, action) => {
      state.loginStatus = true;
      state.loginResponse = action.payload;
    })
    .addCase(loginErrorAction, (state, action) => {
      state.loginStatus = false;
      state.loginResponse = action.payload;
    })
   
    .addDefaultCase((state) => state);
});