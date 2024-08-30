import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import "./index.scss";
import styled from "styled-components";
import InputSelector from "../../../components/InputSelector";
import Storage from "../../../services/Storage";
import MigrationTable from "../../../components/MigrationTable";
import Loader from "../../../components/Loader";
import ArrowLoader from "../../../components/ArrowLoader";
import { ToastContainer, toast } from "react-toastify";
import { Alert, Snackbar } from "@mui/material";
import HorizontalStepper from "../../../components/HorizontalStepper";
import BatchOne from "../BatchFile/BatchOne";
import BatchTwo from "../BatchFile/BatchTwo";
import Migration from "../BatchFile/Migration";
const ProgressBarContainer = styled.div`
  display: flex;
  gap: 0px;
  width: 60%;
`;

const DataMigration = ({
  data,
  getSchema,
  getTable,
  getSourceData,
  migrationStepper,
}) => {
  return (
    <>
      <div className="dat-migration-container">
        <HorizontalStepper
          BatchOne={BatchOne}
          BatchTwo={BatchTwo}
          Migration={Migration}
          migrationStepper={migrationStepper}
        />
      </div>
    </>
  );
};

export default DataMigration;
