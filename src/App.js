import React, { useEffect, useState } from "react";
import "./App.scss";
import Layout from "./components/Layout";

import axios from "axios";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import { routes } from "./routes";
import Storage from "./services/Storage";
import { useSelector, useDispatch } from "react-redux";
import { setHeader, setBaseURL } from "./lib/constant";
import { env } from "./env";
import { Login } from "./pages/BeforeLogin";
import { CustomStepper } from "./pages/BeforeLogin";
import { Container } from "@mui/material";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState("");
  const creatUserSession = async (data) => {
    await Storage.setItem("user", data);
    setUser(data);
  };

  useEffect(() => {
    async function exec() {
      let userData = await Storage.getItem("user");
      if (userData !== null) {
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        setUser({});
        setIsLoggedIn(false);
      }
    }
    exec();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     window.onload = Storage.removeItem("user");
  //   }
  // }, [isLoggedIn]);

  console.log(isLoggedIn, user);
  return (
    <div className="container">
      <div className="App">
        {isLoggedIn ? (
          <div>
            <Layout />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
