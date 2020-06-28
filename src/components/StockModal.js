import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { stockListState } from "../store/atoms";

const StockModal = () => {
  const [form, setForm] = useState({
    symbol: "",
    name: "",
    price: 0,
    grade: 0,
    volume: 0,
  });
  const [error, setError] = useState("");
  const [stocks, setStocks] = useRecoilState(stockListState);

  const handleBlurSymbol = async (event) => {
    try {
      const response = (
        await axios.get(
          `https://blxskdikk0.execute-api.sa-east-1.amazonaws.com/dev/quotation?symbol=${form.symbol}`
        )
      ).data;

      if (!response[form.symbol]) {
        return;
      }

      setForm({
        ...form,
        name: response[form.symbol].name,
        price: response[form.symbol].price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    setError("");

    if (stocks.some((stock) => stock.symbol === form.symbol)) {
      setError("Este ativo já foi adicionado!");
      return;
    }

    setStocks([...stocks, form]);

    setForm({ symbol: "", name: "", price: 0, grade: 0, volume: 0 });
  };

  return (
    <div className="modal" id="stockModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar ativo</h5>

            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="row">
                <div className="col-6 offset-3">
                  <label htmlFor="">Ativo</label>
                  <input
                    value={form.symbol}
                    onChange={(e) =>
                      setForm({ ...form, symbol: e.target.value.toUpperCase() })
                    }
                    onBlur={handleBlurSymbol}
                    className="form-control"
                  />
                  <div className="form-text">Código do ativo. Ex.: PETR4.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 offset-3 mt-3">
                  <label htmlFor="">Nome</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-control"
                  />
                  <div className="form-text">
                    Nome da companhia. Ex.: Petróleo Brasileiro S.A. -
                    Petrobras.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 offset-3 mt-3">
                  <label htmlFor="">Preço</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="form-control"
                  />
                  <div className="form-text">Preço atual do ativo.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 offset-3 mt-3">
                  <label htmlFor="">Nota</label>
                  <input
                    type="number"
                    value={form.grade}
                    onChange={(e) =>
                      setForm({ ...form, grade: e.target.value })
                    }
                    className="form-control"
                  />
                  <div className="form-text">A sua nota para esse ativo.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 offset-3 mt-3">
                  <label htmlFor="">Quantidade</label>
                  <input
                    type="number"
                    value={form.volume}
                    onChange={(e) =>
                      setForm({ ...form, volume: e.target.value })
                    }
                    className="form-control"
                  />
                  <div className="form-text">
                    Quantidade desse ativo na sua carteira atualmente.
                  </div>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-6 offset-3 text-danger mt-3">
                {error && <span>{error}</span>}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleSubmitForm}
            >
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
