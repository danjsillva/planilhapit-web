import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StocksTable from "./components/StocksTable";
import StocksChart from "./components/StocksChart";

import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={'Loading'}>
        <Header />
        
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-lg-2">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-10">
              <StocksTable />

              {/* <StocksChart /> */}
            </div>
          </div>
        </div>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
