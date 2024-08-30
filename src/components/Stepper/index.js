import React, { useEffect } from "react";
import "./index.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Sources from "../../pages/AfterLogin/Sources";
import ProjectForm from "../../pages/Project/ProjectForm";
import Target from "../../pages/AfterLogin/Target/Target";
import CreateSchema from "../../pages/AfterLogin/CreateSchema";
import SchemaComparison from "../../pages/AfterLogin/SchemaComparison";
import SchemaMigration from "../../pages/AfterLogin/SchemaMigration";

const ProgressStep = () => {
  const steps = [
    {
      label: "Projects",
      description: <ProjectForm />,
    },
    {
      label: "Sources",
      description: <Sources />,
    },
    {
      label: "Targets",
      description: <Target />,
    },
    {
      label: "Choose Schema",
      description: <CreateSchema />,
    },
    {
      label: "Schema Comparison",
      description: <SchemaComparison />,
    },
    {
      label: "Schema Migration",
      description: <SchemaMigration />,
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2
                  ? // <Typography variant="caption">Last step</Typography>
                    ""
                  : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.description}
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <div className="" style={{}}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Previous
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressStep;
