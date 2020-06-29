import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./Router";

import "./style.scss";

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={"Loading"}>
        <Router />
      </Suspense>

      <ToastContainer
        position="top-center"
        closeButton={false}
        hideProgressBar={true}
        toastClassName="toast-container"
      />
    </RecoilRoot>
  );
};

export default App;
