import { combineReducers } from "redux";
import { loginReducer } from "./auth/auth-reducer";

import { projectsListReducer } from "./projects/projects-reducer";

import { steppertReducer } from "./stepper/stepper-reducer";
export const rootReducer = combineReducers({
  login: loginReducer,
  projectsList: projectsListReducer,
  steppertReducer: steppertReducer,
});
