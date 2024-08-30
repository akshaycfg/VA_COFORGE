import { createReducer } from "@reduxjs/toolkit";
import {
  projectsAction,
  projecsErrorAction,
  projectsResetAction,
  listConfigsAction,
  listConfigsErrorAction,
  listConfigsResetAction,
} from "./projects-action";

export const projectsListReducer = createReducer({}, (builder) => {
  builder
    .addCase(projectsAction, (state, action) => {
      state.projectListStatus = true;
      state.projectListResponse = action.payload;
    })
    .addCase(projecsErrorAction, (state, action) => {
      state.projectListStatus = false;
      state.projectListResponse = action.payload;
    })
    .addCase(projectsResetAction, (state) => {
      state.projectListStatus = undefined;
      state.projectListResponse = undefined;
    })
    .addCase(listConfigsAction, (state, action) => {
      state.listConfigsStatus = true;
      state.listConfigsResponse = action.payload;
    })
    .addCase(listConfigsErrorAction, (state, action) => {
      state.listConfigsStatus = false;
      state.listConfigsResponse = action.payload;
    })
    .addCase(listConfigsResetAction, (state) => {
      state.listConfigsStatus = undefined;
      state.listConfigsResponse = undefined;
    })
    .addDefaultCase((state) => state);
});
