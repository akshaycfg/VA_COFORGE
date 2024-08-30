import { httpClient } from '../constant'
import { createAction } from '@reduxjs/toolkit';

export const projectsAction = createAction("LIST.PROJECTS");
export const projecsErrorAction = createAction("LIST.PROJECTS_ERROR");
export const projectsResetAction = createAction("LIST.PROJECTS_RESET");

export const listConfigsAction = createAction("LISTCONFIG.PROJECTS");
export const listConfigsErrorAction = createAction("LISTCONFIG.PROJECTS_ERROR");
export const listConfigsResetAction = createAction("LISTCONFIG.PROJECTS_RESET");



export const projectListAsync = () => {
    return (dispatch) => {
        httpClient
            .get("/list_projects")
            .then((response) => {
              console.log(response)
                if (response) {
                    dispatch(projectsAction(response));
                }
            })
            .catch((reason) => {
                dispatch(projecsErrorAction(reason.response));
            });
    };
};

export const listConfigsAsync = () => {
    return (dispatch) => {
        httpClient
            .get("/list_configs")
            .then((response) => {
              console.log(response)
                if (response) {
                    dispatch(listConfigsAction(response));
                }
            })
            .catch((reason) => {
                dispatch(listConfigsErrorAction(reason.response));
            });
    };
};


export const resetProjectActionAsync = () => {
    return (dispatch) => {
        dispatch(projectsResetAction());
    };
};