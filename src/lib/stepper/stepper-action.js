import { httpClient } from "../constant";
import { createAction } from "@reduxjs/toolkit";

export const saveConfigAction = createAction("SAVECONFIG.PROJECTS");
export const saveConfigErrorAction = createAction("SAVECONFIG._ERROR");
export const saveConfigResetAction = createAction("SAVECONFIG._RESET");

export const listSchemasAction = createAction("LISTSCHEMNA.PROJECTS");
export const listSchemasErrorAction = createAction("LISTSCHEMNA._ERROR");
export const listSchemasResetAction = createAction("LISTSCHEMNA._RESET");

export const createProjectAction = createAction("CREATEPROJECT.PROJECTS");
export const createProjectErrorAction = createAction("CREATEPROJECT._ERROR");
export const createProjectsResetAction = createAction("CREATEPROJECT._RESET");

export const listSchemaTablesAction = createAction("LISTSCHEMA.PROJECTS");
export const listSchemaTablesErrorAction = createAction("LISTSCHEMA._ERROR");
export const listSchemaTablesResetAction = createAction("LISTSCHEMA._RESET");

export const testConnectionAction = createAction("TESTCON.PROJECTS");
export const testConnectionErrorAction = createAction("TESTCON._ERROR");
export const testConnectionResetAction = createAction("TESTCON._RESET");

export const getMetadataCompaAction = createAction("GETMETA.PROJECTS");
export const getMetadataCompaErrorAction = createAction("GETMETA._ERROR");
export const getMetadataCompaResetAction = createAction("GETMETA._RESET");

export const convertDatatypesAction = createAction("CONVERTDATA.PROJECTS");
export const convertDatatypesErrorAction = createAction("CONVERTDATA._ERROR");
export const convertDatatypesResetAction = createAction("CONVERTDATA._RESET");

export const generateDdlsAction = createAction("GENERATEDDL.PROJECTS");
export const generateDdlsErrorAction = createAction("GENERATEDDL._ERROR");
export const generateDdlsResetAction = createAction("GENERATEDDL._RESET");

export const selectSourceSchemasAction = createAction("SELECTSOURCE.PROJECTS");
export const selectSourceSchemasErrorAction = createAction(
  "SELECTSOURCE._ERROR"
);
export const selectSourceSchemasResetAction = createAction(
  "SELECTSOURCE._RESET"
);

export const saveSourceMetadataSchemaAction = createAction(
  "SAVESOURCEMETADATA.PROJECTS"
);
export const saveSourceMetadataSchemaErrorAction = createAction(
  "SAVESOURCEMETADATA._ERROR"
);
export const saveSourceMetadataSchemaResetAction = createAction(
  "SAVESOURCEMETADATA._RESET"
);

export const executeDdlsAction = createAction("EXECUTEDDL.PROJECTS");
export const executeDdlsErrorAction = createAction("EXECUTEDDL._ERROR");
export const executeDdlsResetAction = createAction("EXECUTEDDL._RESET");

export const viewReportAction = createAction("VIEWREPORT.PROJECTS");
export const viewReportErrorAction = createAction("VIEWREPORT._ERROR");
export const viewReportResetAction = createAction("VIEWREPORT._RESET");

export const PrepareMetaDataAction = createAction("PREPAREMETADATA.PROJECTS");
export const PrepareMetaDataErrorAction = createAction(
  "PREPAREMETADATA._ERROR"
);
export const PrepareMetaDataResetAction = createAction(
  "PREPAREMETADATA._RESET"
);

export const PrepareMetaDataClickAction = createAction("PREPAREMETADATACL.PROJECTS");
export const PrepareMetaDataClickErrorAction = createAction(
  "PREPAREMETADATACL._ERROR"
);
export const PrepareMetaDataClickResetAction = createAction(
  "PREPAREMETADATACL._RESET"
);

export const saveConfigAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/save_config", data)
      .then((response) => {
        console.log(response);
        if (response) {
          dispatch(saveConfigAction(response));
        }
      })
      .catch((reason) => {
        dispatch(saveConfigErrorAction(reason.response));
      });
  };
};

export const listSchemasAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/list_schemas", data)
      .then((response) => {
        if (response) {
          dispatch(listSchemasAction(response));
        }
      })
      .catch((reason) => {
        dispatch(listSchemasErrorAction(reason.response));
      });
  };
};

export const createProjectAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/create_project", data)
      .then((response) => {
        if (response) {
          dispatch(createProjectAction(response));
        }
      })
      .catch((reason) => {
        dispatch(createProjectErrorAction(reason.response));
      });
  };
};

export const listSchemaTablesAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/list_schema_tables", data)
      .then((response) => {
        if (response) {
          dispatch(listSchemaTablesAction(response));
        }
      })
      .catch((reason) => {
        dispatch(listSchemaTablesErrorAction(reason.response));
      });
  };
};

export const testConnectionAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/test_connection", data)
      .then((response) => {
        if (response) {
          dispatch(testConnectionAction(response));
        }
      })
      .catch((reason) => {
        dispatch(testConnectionErrorAction(reason.response));
      });
  };
};

export const getMetadataCompaAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/get_metadata_comp", data)
      .then((response) => {
        if (response) {
          dispatch(getMetadataCompaAction(response));
        }
      })
      .catch((reason) => {
        dispatch(getMetadataCompaErrorAction(reason.response));
      });
  };
};

export const convertDatatypesAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/metadata_to_ddl", data)
      .then((response) => {
        if (response) {
          dispatch(convertDatatypesAction(response));
        }
      })
      .catch((reason) => {
        dispatch(convertDatatypesErrorAction(reason.response));
      });
  };
};

export const prepareMetaDatatypesAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/prepare_metadata", data)
      .then((response) => {
        if (response) {
          dispatch(PrepareMetaDataClickAction(response));
        }
      })
      .catch((reason) => {
        dispatch(PrepareMetaDataClickErrorAction(reason.response));
      });
  };
};
export const generateDdlsAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/generate_ddls", data)
      .then((response) => {
        if (response) {
          dispatch(generateDdlsAction(response));
        }
      })
      .catch((reason) => {
        dispatch(generateDdlsErrorAction(reason.response));
      });
  };
};

export const selectSourceSchemasAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/select_source_schemas", data)
      .then((response) => {
        if (response) {
          dispatch(selectSourceSchemasAction(response));
        }
      })
      .catch((reason) => {
        dispatch(selectSourceSchemasErrorAction(reason.response));
      });
  };
};

export const saveSourceMetadataSchemaAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/save_source_metadata_schema", data)
      .then((response) => {
        if (response) {
          dispatch(saveSourceMetadataSchemaAction(response));
        }
      })
      .catch((reason) => {
        dispatch(saveSourceMetadataSchemaErrorAction(reason.response));
      });
  };
};

export const executeDdlsAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/execute_ddls", data)
      .then((response) => {
        if (response) {
          dispatch(executeDdlsAction(response));
        }
      })
      .catch((reason) => {
        dispatch(executeDdlsErrorAction(reason.response));
      });
  };
};

export const viewReportAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/view_reports", data)
      .then((response) => {
        if (response) {
          dispatch(viewReportAction(response));
        }
      })
      .catch((reason) => {
        dispatch(viewReportErrorAction(reason.response));
      });
  };
};
export const listMetaDataAsync = (data) => {
  return (dispatch) => {
    httpClient
      .post("/list_inventory", data)
      .then((response) => {
        if (response) {
          dispatch(PrepareMetaDataAction(response));
        }
      })
      .catch((reason) => {
        dispatch(PrepareMetaDataErrorAction(reason.response));
      });
  };
};
export const resetSaveConfigAsync = () => {
  return (dispatch) => {
    dispatch(saveConfigResetAction());
  };
};

export const listSchemasResetAsync = () => {
  return (dispatch) => {
    dispatch(listSchemasResetAction());
  };
};
export const createProjectResetAsync = () => {
  return (dispatch) => {
    dispatch(createProjectsResetAction());
  };
};

export const testConnectioResetAsync = () => {
  return (dispatch) => {
    dispatch(testConnectionResetAction());
  };
};

export const getMetadataCompResetAsync = () => {
  return (dispatch) => {
    dispatch(getMetadataCompaResetAction());
  };
};

export const convertDatatypesResetAsync = () => {
  return (dispatch) => {
    dispatch(convertDatatypesResetAction());
  };
};

export const generateDdlsResetAsync = () => {
  return (dispatch) => {
    dispatch(generateDdlsResetAction());
  };
};

export const selectSourceSchemasResetAsync = () => {
  return (dispatch) => {
    dispatch(selectSourceSchemasResetAction());
  };
};

export const saveSourceMetadataSchemaResetAsync = () => {
  return (dispatch) => {
    dispatch(saveSourceMetadataSchemaResetAction());
  };
};

export const executeDdlsResetAsync = () => {
  return (dispatch) => {
    dispatch(executeDdlsResetAction());
  };
};

export const listSchemaTableResetAsync = () => {
  return (dispatch) => {
    dispatch(listSchemaTablesResetAction());
  };
};

export const viewReportResetAsync = () => {
  return (dispatch) => {
    dispatch(viewReportResetAction());
  };
};

export const prepateMeatadatasaveResetAsync = () => {
  return (dispatch) => {
    dispatch(PrepareMetaDataClickResetAction());
  };
};