import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";

import Router from "./Router"
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";

import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={"Loading"}>
        {/* <Header /> */}

        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-lg-2">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-10">
              <Router />
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
