import { createReducer } from "@reduxjs/toolkit";
import {
  saveConfigAction,
  saveConfigErrorAction,
  saveConfigResetAction,
  listSchemasAction,
  listSchemasErrorAction,
  listSchemasResetAction,
  createProjectAction,
  createProjectErrorAction,
  createProjectsResetAction,
  testConnectionAction,
  testConnectionErrorAction,
  testConnectionResetAction,
  getMetadataCompaAction,
  getMetadataCompaErrorAction,
  getMetadataCompaResetAction,
  convertDatatypesAction,
  convertDatatypesErrorAction,
  convertDatatypesResetAction,
  generateDdlsAction,
  generateDdlsErrorAction,
  generateDdlsResetAction,
  selectSourceSchemasAction,
  selectSourceSchemasErrorAction,
  selectSourceSchemasResetAction,
  saveSourceMetadataSchemaAction,
  saveSourceMetadataSchemaErrorAction,
  saveSourceMetadataSchemaResetAction,
  executeDdlsAction,
  executeDdlsErrorAction,
  executeDdlsResetAction,
  listSchemaTablesAction,
  listSchemaTablesErrorAction,
  listSchemaTablesResetAction,
  viewReportAction,
  viewReportErrorAction,
  viewReportResetAction,
  PrepareMetaDataAction,
  PrepareMetaDataClickAction,
  PrepareMetaDataClickErrorAction,
  PrepareMetaDataClickResetAction
} from "./stepper-action";

export const steppertReducer = createReducer({}, (builder) => {
  builder
    .addCase(saveConfigAction, (state, action) => {
      state.saveConfigStatus = true;
      state.saveConfigResponse = action.payload;
    })
    .addCase(saveConfigErrorAction, (state, action) => {
      state.saveConfigStatus = false;
      state.saveConfigResponse = action.payload;
    })
    .addCase(saveConfigResetAction, (state) => {
      state.saveConfigStatus = undefined;
      state.saveConfigResponse = undefined;
    })
    .addCase(listSchemasAction, (state, action) => {
      state.listSchemasStatus = true;
      state.listSchemasResponse = action.payload;
    })
    .addCase(listSchemasErrorAction, (state, action) => {
      state.listSchemasStatus = false;
      state.listSchemasResponse = action.payload;
    })
    .addCase(listSchemasResetAction, (state) => {
      state.listSchemasStatus = undefined;
      state.listSchemasResponse = undefined;
    })
    .addCase(createProjectAction, (state, action) => {
      state.createProjectStatus = true;
      state.createProjectResponse = action.payload;
    })
    .addCase(createProjectErrorAction, (state, action) => {
      state.createProjectStatus = false;
      state.createProjectResponse = action.payload;
    })
    .addCase(createProjectsResetAction, (state) => {
      state.createProjectStatus = undefined;
      state.createProjectResponse = undefined;
    })
    .addCase(testConnectionAction, (state, action) => {
      state.testConnectionStatus = true;
      state.testConnectionResponse = action.payload;
    })
    .addCase(testConnectionErrorAction, (state, action) => {
      state.testConnectionStatus = false;
      state.testConnectionResponse = action.payload;
    })
    .addCase(testConnectionResetAction, (state) => {
      state.testConnectionStatus = undefined;
      state.testConnectionResponse = undefined;
    })
    .addCase(getMetadataCompaAction, (state, action) => {
      state.getMetadataCompaStatus = true;
      state.getMetadataCompaResponse = action.payload;
    })
    .addCase(getMetadataCompaErrorAction, (state, action) => {
      state.getMetadataCompaStatus = false;
      state.getMetadataCompaResponse = action.payload;
    })
    .addCase(getMetadataCompaResetAction, (state) => {
      state.getMetadataCompaStatus = undefined;
      state.getMetadataCompaResponse = undefined;
    })
    .addCase(convertDatatypesAction, (state, action) => {
      state.convertDatatypesStatus = true;
      state.convertDatatypesResponse = action.payload;
    })
    .addCase(convertDatatypesErrorAction, (state, action) => {
      state.convertDatatypesStatus = false;
      state.convertDatatypesResponse = action.payload;
    })
    .addCase(convertDatatypesResetAction, (state) => {
      state.convertDatatypesStatus = undefined;
      state.convertDatatypesResponse = undefined;
    })
    .addCase(generateDdlsAction, (state, action) => {
      state.generateDdlsStatus = true;
      state.generateDdlsResponse = action.payload;
    })
    .addCase(generateDdlsErrorAction, (state, action) => {
      state.generateDdlsStatus = false;
      state.generateDdlsResponse = action.payload;
    })
    .addCase(generateDdlsResetAction, (state) => {
      state.generateDdlsStatus = undefined;
      state.generateDdlsResponse = undefined;
    })
    .addCase(selectSourceSchemasAction, (state, action) => {
      state.selectSourceSchemasStatus = true;
      state.selectSourceSchemasResponse = action.payload;
    })
    .addCase(selectSourceSchemasErrorAction, (state, action) => {
      state.selectSourceSchemasStatus = false;
      state.selectSourceSchemasResponse = action.payload;
    })
    .addCase(selectSourceSchemasResetAction, (state) => {
      state.selectSourceSchemasStatus = undefined;
      state.selectSourceSchemasResponse = undefined;
    })
    .addCase(saveSourceMetadataSchemaAction, (state, action) => {
      state.saveSourceMetadataSchemaStatus = true;
      state.saveSourceMetadataSchemaResponse = action.payload;
    })
    .addCase(saveSourceMetadataSchemaErrorAction, (state, action) => {
      state.saveSourceMetadataSchemaStatus = false;
      state.saveSourceMetadataSchemaResponse = action.payload;
    })
    .addCase(saveSourceMetadataSchemaResetAction, (state) => {
      state.saveSourceMetadataSchemaStatus = undefined;
      state.saveSourceMetadataSchemaResponse = undefined;
    })
    .addCase(executeDdlsAction, (state, action) => {
      state.executeDdlsStatus = true;
      state.executeDdlsResponse = action.payload;
    })
    .addCase(executeDdlsErrorAction, (state, action) => {
      state.executeDdlsStatus = false;
      state.executeDdlsResponse = action.payload;
    })
    .addCase(executeDdlsResetAction, (state) => {
      state.executeDdlsStatus = undefined;
      state.executeDdlsResponse = undefined;
    })
    .addCase(listSchemaTablesAction, (state, action) => {
      state.listSchemaTablesStatus = true;
      state.listSchemaTablesResponse = action.payload;
    })
    .addCase(listSchemaTablesErrorAction, (state, action) => {
      state.listSchemaTablesStatus = false;
      state.listSchemaTablesResponse = action.payload;
    })
    .addCase(listSchemaTablesResetAction, (state) => {
      state.listSchemaTablesStatus = undefined;
      state.listSchemaTablesResponse = undefined;
    })
    .addCase(viewReportAction, (state, action) => {
      state.viewReportStatus = true;
      state.viewReportResponse = action.payload;
    })
    .addCase(viewReportErrorAction, (state, action) => {
      state.viewReportStatus = false;
      state.viewReportResponse = action.payload;
    })
    .addCase(viewReportResetAction, (state) => {
      state.viewReportStatus = undefined;
      state.viewReportResponse = undefined;
    })
    .addCase(PrepareMetaDataAction, (state, action) => {
      state.prepareMetaDataStatus = true;
      state.prepareMetaDataResponse = action.payload;
    })
    .addCase(PrepareMetaDataClickAction, (state, action) => {
      state.metaDataClickStatus = true;
      state.metaDataClickResponse = action.payload;
    })
    .addCase(PrepareMetaDataClickErrorAction, (state, action) => {
      state.metaDataClickStatus = false;
      state.metaDataClickResponse = action.payload;
    })
    .addCase(PrepareMetaDataClickResetAction, (state) => {
      state.metaDataClickStatus = undefined;
      state.metaDataClickResponse = undefined;
    })
    .addDefaultCase((state) => state);
});
