import React from "react";

import Sidebar from "../components/Sidebar";
import StocksTable from "../components/StocksTable";
import StocksCharts from "../components/StocksCharts";
import StockModal from "../components/StockModal";
import ImportModal from "../components/ImportModal";

const Stocks = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-lg-10">
          <StocksTable />

          <StocksCharts />

          <StockModal />
          <ImportModal />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
