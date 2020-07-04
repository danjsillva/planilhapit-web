import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import { parse } from "papaparse";

import DevelopedBy from "./DevelopedBy";

import { balanceState, stockListState } from "../store/atoms";
import {
  stockListTotalState,
  stockListIdealTotalState,
} from "../store/selectors";

const Sidebar = () => {
  const [balance, setBalance] = useRecoilState(balanceState);
  const [stocks, setStocks] = useRecoilState(stockListState);
  const stockListTotal = useRecoilValue(stockListTotalState);
  const stockListIdealTotal = useRecoilValue(stockListIdealTotalState);

  const handleClickExport = async (event) => {
    try {
      toast.success("A lista de ativos foi exportada!");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao tentar exportar lista de ativos!");
    }
  };

  const handleClickImport = async (event) => {
    try {
      const file = event.target.files[0];

      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setStocks(results.data);

          toast.success("A lista de ativos foi importada!");
        },
      });
    } catch (error) {
      console.log(error);

      toast.error("Erro ao tentar importar lista de ativos!");
    }

    event.target.value = null;
  };

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
              onValueChange={(values) => setBalance(values.floatValue)}
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
              onClick={handleClickExport}
            >
              Exportar CSV
            </CSVLink>
          </div>
          <div className="col-6 col-lg-12 mt-1">
            <button
              className="btn btn-dark btn-block"
              onClick={() => document.getElementById("stockListFile").click()}
            >
              Importar CSV
            </button>
            <input
              id="stockListFile"
              type="file"
              accept=".csv"
              className="form-control-file"
              onChange={handleClickImport}
            />
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
