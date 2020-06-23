import React from "react";
import { RecoilRoot } from "recoil";

import Sidebar from "./components/Sidebar";
import AssetsTable from "./components/AssetsTable";
import AssetsChart from "./components/AssetsChart";

import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-9">
            <AssetsTable />

            <AssetsChart />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
