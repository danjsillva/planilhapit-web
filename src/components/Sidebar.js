import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import NumberFormat from "react-number-format";
import { CSVLink } from "react-csv";

import DevelopedBy from "./DevelopedBy";

import { balanceState, stockListState } from "../store/atoms";
import {
  stockListTotalState,
  stockListIdealTotalState,
} from "../store/selectors";

const Sidebar = () => {
  const [balance, setBalance] = useRecoilState(balanceState);
  const [stocks] = useRecoilState(stockListState);
  const stockListTotal = useRecoilValue(stockListTotalState);
  const stockListIdealTotal = useRecoilValue(stockListIdealTotalState);

  return (
    <div className="">
      <div className="card card-body">
        <div className="row">
          <div className="col-6 col-lg-12">
            <label htmlFor="">Saldo</label>
            <NumberFormat
              defaultValue={0}
              value={balance}
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              allowLeadingZeros={false}
              onValueChange={values => setBalance(values.floatValue)}
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
            <NumberFormat
              defaultValue={0}
              value={stockListTotal}
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              allowLeadingZeros={false}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-6 col-lg-12 mt-3">
            <label htmlFor="">Total ideal</label>
            <NumberFormat
              defaultValue={0}
              value={stockListIdealTotal}
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              allowLeadingZeros={false}
              className="form-control"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="row">
          <div className="col-6 col-lg-12">
            <CSVLink
              filename="planilhapit-stocks.csv"
              data={stocks}
              separator={";"}
              className="btn btn-dark btn-block"
            >
              Exportar CSV
            </CSVLink>
          </div>
          <div className="col-6 col-lg-12 mt-1">
            <button
              className="btn btn-dark btn-block"
              data-toggle="modal"
              data-target="#importModal"
            >
              Importar CSV
            </button>
          </div>
        </div>
      </div>

      {/* <hr />

      <div className="mt-">
        <div className="row">
          <div className="col-6 col-lg-12">
            <button className="btn btn-dark btn-block disabled">Entrar</button>
          </div>
          <div className="col-6 col-lg-12 mt-1">
            <button className="btn btn-link btn-sm btn-block text-dark disabled">
              Criar uma conta
            </button>
          </div>
        </div>
      </div> */}

      <div className="mt-5">
        <DevelopedBy />
      </div>
    </div>
  );
};

export default Sidebar;
