import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FiPlusCircle, FiList, FiXCircle } from "react-icons/fi";
import NumberFormat from "react-number-format";
import classNames from "classnames";

import { stockListState } from "../store/atoms";
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

const StocksTable = () => {
  const [stocks, setStocks] = useRecoilState(stockListState);
  const stocksFull = useRecoilValue(stockListFullState);

  const handleBlurCell = (symbol, field, value) => {
    setStocks(
      stocks.map((stock) =>
        stock.symbol === symbol ? { ...stock, [field]: value } : stock
      )
    );
  };

  const handleClickRemove = (symbol) => {
    setStocks(stocks.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <>
      {stocksFull.length ? (
        <>
          <div className="card card-body mt-3">
            <div className="row align-items-end font-weight-bold">
              <div className="col-3">Ativo</div>
              <div className="col-1 text-right">Nota</div>
              <div className="col-1 text-right">Preço</div>
              <div className="col-1 text-right">Quant atual</div>
              <div className="col-2 text-right">Total atual</div>
              <div className="col-1 text-right">Quant ideal</div>
              <div className="col-2 text-right">Total ideal</div>
              <div className="col-1 text-right"></div>
            </div>
          </div>

          {stocksFull.map((stock) => (
            <div key={stock.symbol} className="card card-body mt-1">
              <div className="row align-items-center">
                <div className="col-3">
                  <b>{stock.symbol}</b>
                  <small className="d-block text-truncate">{stock.name}</small>
                </div>
                <div className="col-1 text-right">
                  <NumberFormat
                    defaultValue={0}
                    value={stock.grade}
                    prefix=""
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                    fixedDecimalScale={false}
                    allowLeadingZeros={false}
                    onValueChange={(values) =>
                      handleBlurCell(stock.symbol, "grade", values.floatValue)
                    }
                    className="form-control"
                    autoFocus
                  />
                </div>
                <div className="col-1 text-right">
                  <NumberFormat
                    defaultValue={0}
                    value={stock.price}
                    prefix=""
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowLeadingZeros={false}
                    onValueChange={(values) =>
                      handleBlurCell(stock.symbol, "price", values.floatValue)
                    }
                    className="form-control"
                    autoFocus
                  />
                </div>
                <div className="col-1 text-right">
                  <NumberFormat
                    defaultValue={0}
                    value={stock.volume}
                    prefix=""
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                    fixedDecimalScale={false}
                    allowLeadingZeros={false}
                    onValueChange={(values) =>
                      handleBlurCell(stock.symbol, "volume", values.floatValue)
                    }
                    className="form-control"
                    autoFocus
                  />
                </div>
                <div className="col-2 text-right">
                  <b>R$ {stock.total.toFixed(2)}</b>
                  <small className="d-block text-muted">
                    {stock.percent.toFixed(1)}%
                  </small>
                </div>
                <div className="col-1 text-right">
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
                <div className="col-1 text-right">
                  <button
                    className="btn btn-outline-white"
                    onClick={(e) => handleClickRemove(stock.symbol)}
                  >
                    <FiXCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
            <div className="text-muted">Você tem {stocksFull.length} ativos na sua carteira</div>
            <div className="">
              <button
                className="btn btn-dark px-5"
                data-toggle="modal"
                data-target="#stockModal"
              >
                Adicionar ativo
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default StocksTable;
