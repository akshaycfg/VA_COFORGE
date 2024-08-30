import React, { useEffect } from "react";
import loader from "../../images/ArrowLoader.svg";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";
import { ToastContainer, toast } from "react-toastify";

export  const ShowMessage = (status,message) => {

    toast.success("fdfsd", {
      // position: toast.POSITION.TOP_RIGHT,
    });
   alert("HEllo")
  
  return (
    <>
     {/* <button onClick={showToastMessage}>Notify</button> */}
     <ToastContainer />
    </>
  );
};


