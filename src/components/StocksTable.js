import React from "react";
import { useRecoilValue } from "recoil";
import { FiPlusCircle } from "react-icons/fi";

import StockModal from "./StockModal";

import { fullStockListState } from "../store/selectors";

const StocksTable = () => {
  const stocks = useRecoilValue(fullStockListState);

  return (
    <div className="">
      <StockModal />

      <div className="card card-body font-weight-bold">
        <div className="row">
          <div className="col-5 border-right text-center">Ativo</div>
          <div className="col-3 border-right text-center">Posição Atual</div>
          <div className="col-3 border-right text-center">Posição Ideal</div>
          <div className="col-1 text-center">Ação</div>
        </div>
      </div>
      
      {stocks.map((stock) => (
        <div key={stock.symbol} className="card card-body pointer mt-1">
          <div className="row">
            <div className="col">{stock.symbol}</div>
            <div className="col">{stock.grade}</div>
            <div className="col-2 border-right">
              R$ {stock.price.toFixed(2)}
            </div>
            <div className="col-1">{stock.volume}</div>
            <div className="col-1">R$ {stock.total.toFixed(2)}</div>
            <div className="col-1 border-right">
              {stock.percent.toFixed(1)}%
            </div>
            <div className="col-1">{stock.idealVolume}</div>
            <div className="col-1">R$ {stock.idealTotal.toFixed(2)}</div>
            <div className="col-1 border-right">
              {stock.idealPercent.toFixed(1)}%
            </div>
            <div className="col-1">{stock.status}</div>
          </div>
        </div>
      ))}

      <div
        className="card card-body pointer mt-1"
        data-toggle="modal"
        data-target="#stockModal"
      >
        <div className="row">
          <div className="col text-center">
            <FiPlusCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksTable;
