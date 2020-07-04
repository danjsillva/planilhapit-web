import React from "react";
import { useRecoilValue } from "recoil";
import {
  FiPlusCircle,
  FiList,
} from "react-icons/fi";
import classNames from "classnames";

import { stockListFullState } from "../store/selectors";

const EmptyState = () => {
  return (
    <div className="text-center p-5 mt-5">
      <span className="d-inline-block bg-dark p-3 rounded-circle">
        <FiList size={32} className="text-light" />
      </span>

      <div className="font-weight-bold mt-3">
        Parece que sua planilha está vazia!
      </div>
      <div className="text-muted">
        Comece atualizado o seu saldo e depois adicione o seu primeiro ativo.
      </div>
      <div className="text-muted">
        Que tal criar uma conta e sincronizar os seus dados?
      </div>

      <button
        className="btn btn-dark px-5 mt-5"
        data-toggle="modal"
        data-target="#stockModal"
      >
        Adicionar meu primeiro ativo
      </button>
      {/* <button className="btn btn-link btn-sm btn-block text-dark mt-1 disabled">
        Criar uma conta
      </button> */}
    </div>
  );
};

const Table = ({ stocks }) => {
  return (
    <>
      <div className="card card-body">
        <div className="row font-weight-bold">
          <div className="col-2">Ativo</div>
          <div className="col-1 text-right">Nota</div>
          <div className="col-1 text-right">Preço</div>
          <div className="col-2 text-right">Quantidade atual</div>
          <div className="col-2 text-right">Total atual</div>
          <div className="col-2 text-right">Quantidade ideal</div>
          <div className="col-2 text-right">Total ideal</div>
        </div>
      </div>

      {stocks.map((stock) => (
        <div key={stock.symbol} className="card card-body pointer mt-1">
          <div className="row">
            <div className="col-2">
              <b>{stock.symbol}</b>
              <small className="d-block text-truncate">{stock.name}</small>
            </div>
            <div className="col-1 text-right">{stock.grade}</div>
            <div className="col-1 text-right">R$ {stock.price.toFixed(2)}</div>
            <div className="col-2 text-right">{stock.volume}</div>
            <div className="col-2 text-right">
              <b>R$ {stock.total.toFixed(2)}</b>
              <small className="d-block text-muted">
                {stock.percent.toFixed(1)}%
              </small>
            </div>
            <div className="col-2 text-right">
              {stock.idealVolume}
              <small
                className={classNames([
                  "d-block",
                  {
                    "text-success": stock.differenceVolume > 0,
                    "text-danger": stock.differenceVolume < 0,
                  },
                ])}
              >
                ({stock.differenceVolume})
              </small>
            </div>
            <div className="col-2 text-right">
              <b>R$ {stock.idealTotal.toFixed(2)}</b>
              <small className="d-block text-muted">
                {stock.idealPercent.toFixed(1)}%
              </small>
            </div>
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
  );
};

const StocksTable = () => {
  const stocks = useRecoilValue(stockListFullState);

  return <>{stocks.length ? <Table stocks={stocks} /> : <EmptyState />}</>;
};

export default StocksTable;
