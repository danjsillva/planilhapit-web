import React from "react";
import { useRecoilValue } from "recoil";
import {
  FiPlusCircle,
  FiList,
  FiChevronDown,
  FiChevronUp,
  FiMinus,
} from "react-icons/fi";

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

const StockCell = ({ symbol, name, grade, price }) => {
  return (
    <div className="row">
      <div className="col-4" title={name}>
        <b>{symbol}</b>
      </div>
      <div className="col-2 text-right" title="Nota">
        {grade}
      </div>
      <div className="col-6 text-right border-right" title="Preço">
        R$ {price.toFixed(2)}
      </div>
    </div>
  );
};

const PositionCell = ({ volume, total, percent }) => {
  return (
    <div className="row">
      <div className="col-3 text-right" title="Quantidade">
        {volume}
      </div>
      <div className="col-6 text-right" title="Total">
        <b>R$ {total.toFixed(2)}</b>
      </div>
      <div className="col-3 text-right border-right" title="Percentual">
        {percent.toFixed(1)}%
      </div>
    </div>
  );
};

const ActionCell = ({ status }) => {
  return status === 0 ? (
    <>
      {status} <FiMinus className="text-danger" />
    </>
  ) : status > 0 ? (
    <>
      {status} <FiChevronUp className="text-success" />
    </>
  ) : (
    <>
      {status} <FiChevronDown className="text-danger" />
    </>
  );
};

const Table = ({ stocks }) => {
  return (
    <>
      <div className="card card-body">
        <div className="row">
          <div className="col-3 border-right">
            <div className="row text-center font-weight-bold">
              <div className="col">Ativo</div>
            </div>
            <div className="row form-text">
              <div className="col-3">
                <small>Código</small>
              </div>
              <div className="col-3 text-right">
                <small>Nota</small>
              </div>
              <div className="col-6 text-right">
                <small>Preço</small>
              </div>
            </div>
          </div>
          <div className="col-4 border-right">
            <div className="row text-center font-weight-bold">
              <div className="col">Posição Atual</div>
            </div>
            <div className="row form-text">
              <div className="col-3 text-right">
                <small>Quantidade</small>
              </div>
              <div className="col-6 text-right">
                <small>Total</small>
              </div>
              <div className="col-3 text-right">
                <small>Percentual</small>
              </div>
            </div>
          </div>
          <div className="col-4 border-right">
            <div className="row text-center font-weight-bold">
              <div className="col">Posição Ideal</div>
            </div>
            <div className="row form-text">
              <div className="col-3 text-right">
                <small>Quantidade</small>
              </div>
              <div className="col-6 text-right">
                <small>Total</small>
              </div>
              <div className="col-3 text-right">
                <small>Percentual</small>
              </div>
            </div>
          </div>
          <div className="col-1">
            <div className="row text-center font-weight-bold">
              <div className="col">Ação</div>
            </div>
            <div className="row form-text">
              <div className="col text-right">
                <small>Quantidade</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {stocks.map((stock) => (
        <div key={stock.symbol} className="card card-body pointer mt-1">
          <div className="row">
            <div className="col-3">
              <StockCell
                symbol={stock.symbol}
                name={stock.name}
                grade={stock.grade}
                price={stock.price}
              />
            </div>
            <div className="col-4">
              <PositionCell
                volume={stock.volume}
                total={stock.total}
                percent={stock.percent}
              />
            </div>
            <div className="col-4">
              <PositionCell
                volume={stock.idealVolume}
                total={stock.idealTotal}
                percent={stock.idealPercent}
              />
            </div>
            <div className="col-1 text-right">
              <ActionCell status={stock.status} />
            </div>
          </div>
          {/* <div className="row py-5">
            <div className="col">
              <form>
                <div className="row">
                  <div className="col-6 offset-3">
                    <label htmlFor="">Ativo</label>
                    <input value={stock.symbol} className="form-control" />
                    <div className="form-text">Código do ativo. Ex.: PETR4.</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 offset-3 mt-3">
                    <label htmlFor="">Nota</label>
                    <input type="number" value={stock.grade} className="form-control" />
                    <div className="form-text">A sua nota para esse ativo.</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 offset-3 mt-3">
                    <label htmlFor="">Quantidade</label>
                    <input type="number" value={stock.volume} className="form-control" />
                    <div className="form-text">
                      Quantidade desse ativo na sua carteira atualmente.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
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
