import React from "react";
import { useRecoilState } from "recoil";

import { balanceState, stockListState } from "../store/atoms";

const Sidebar = () => {
  const [balance, setBalance] = useRecoilState(balanceState);
  const [stocks] = useRecoilState(stockListState);

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
            <label htmlFor="">Total investido</label>
            <input
              value={stocks
                .reduce((total, stock) => total + stock.price * stock.volume, 0)
                .toFixed(2)}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-6 col-lg-12 mt-3">
            <label htmlFor="">Total ideal</label>
            <input
              value={stocks
                .reduce(
                  (total, stock) => total + stock.price * stock.idealVolume,
                  0
                )
                .toFixed(2)}
              className="form-control"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
