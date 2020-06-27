import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { balanceState } from "../store/atoms";
import { stockListTotalState, stockListIdealTotalState } from "../store/selectors";

const Sidebar = () => {
  const [balance, setBalance] = useRecoilState(balanceState);
  const stockListTotal = useRecoilValue(stockListTotalState);
  const stockListIdealTotal = useRecoilValue(stockListIdealTotalState);

  return (
    <div className="">
      <div className="card card-body">
        <div className="row">
          <div className="col-6 col-lg-12">
            <label htmlFor="">Saldo</label>
            <input
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="form-control"
              autoFocus
            />
            <div className="form-text">Seu saldo total na corretora.</div>
          </div>
        </div>
      </div>

      <div className="card card-body mt-1">
        <div className="row">
          <div className="col-6 col-lg-12">
            <label htmlFor="">Total atual</label>
            <input
              value={stockListTotal.toFixed(2)}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-6 col-lg-12 mt-3">
            <label htmlFor="">Total ideal</label>
            <input
              value={stockListIdealTotal.toFixed(2)}
              className="form-control"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="row">
          <div className="col-6 col-lg-12">
            <button className="btn btn-dark btn-block">Exportar CSV</button>
          </div>
          <div className="col-6 col-lg-12 mt-1">
            <button className="btn btn-dark btn-block">Importar CSV</button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="row">
          <div className="col-6 col-lg-12">
            <button className="btn btn-dark btn-block disabled">Entrar</button>
          </div>
          <div className="col-6 col-lg-12 mt-1">
            <button className="btn btn-link btn-sm btn-block text-dark disabled">Criar uma conta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
