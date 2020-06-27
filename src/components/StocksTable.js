import React from "react";
import { useRecoilValue } from "recoil";
import { FiPlusCircle, FiList } from "react-icons/fi";

import StockModal from "./StockModal";

import { stockListFullState } from "../store/selectors";

const EmptyState = () => {
  return (
    <div className="text-center p-5 mt-5">
      <span className="d-inline-block bg-dark p-3 rounded-circle">
        <FiList size={32} className="text-light" />
      </span>

      <div className="font-weight-bold mt-3">Parece que sua planilha está vazia!</div>
      <div className="">Comece atualizado o seu saldo e depois adicione o seu primeiro ativo.</div>
      <div className="">Que tal criar uma conta e sincronizar os seus dados?</div>

      <button 
        className="btn btn-dark px-5 mt-5" 
        data-toggle="modal"
        data-target="#stockModal"
      >Adicionar meu primeiro ativo</button>
      <button className="btn btn-link btn-sm btn-block text-dark mt-1">Criar uma conta</button>
  </div>
  )
}

const Table = ({ stocks }) => {
  return (
    <>
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
    </>
  )
}

const StocksTable = () => {
  const stocks = useRecoilValue(stockListFullState);

  return (
    <div className="">
      {stocks.length ? <Table stocks={stocks} /> : <EmptyState />}

      <StockModal />
    </div>
  );
};

export default StocksTable;
