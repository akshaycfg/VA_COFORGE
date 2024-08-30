import { Login } from "./pages/BeforeLogin";
import {
  CreateProject,
  Projects,
  Sources,
  Stepper,
  ManageStepper,
  Report,
  ProjectReport,
} from "./pages/AfterLogin";
import Layout from "./components/Layout";

/* 
    For After auth route
    afterLogin: true,
    For route with not auth effect
    noAuthEffect: true,
   
*/

const page404 = () => {
  return <h1>404</h1>;
};

export const routes = [
  {
    path: "/",
    component: Login,
    exact: false,
  },
  {
    path: "/source",
    component: Sources,
    exact: true,
  },
  {
    path: "/stepper",
    component: Stepper,
    exact: true,
  },
  {
    path: "/reportchart",
    component: Report,
    exact: true,
  },
  {
    path: "/projectreport",
    component: ProjectReport,
    exact: true,
  },
  {
    path: "/managestepper",
    component: ManageStepper,
    exact: true,
  },
  {
    path: "/createproject",
    component: CreateProject,
    exact: true,
  },
  {
    path: "/Projects",
    component: Projects,
    exact: true,
  },
  {
    path: "/Layout",
    component: Layout,
    exact: true,
  },
  {
    path: page404,
    noAuthEffect: true,
  },
];
