import React from "react";
import { useRecoilState } from "recoil";
import { parse } from "papaparse";
import { toast } from "react-toastify";

import { stockListState } from "../store/atoms";

const ImportModal = () => {
  const [, setStocks] = useRecoilState(stockListState);

  const handleClickImport = async (event) => {
    try {
      const file = document.getElementById("stockListFile").files[0];

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
  };

  return (
    <div className="modal" id="importModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Importar lista de ativos</h5>

            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-6 offset-3 custom-file">
                <label htmlFor="">Arquivo</label>
                <input
                  type="file"
                  accept=".csv"
                  className="form-control custom-file-input"
                  id="stockListFile"
                />
                <div className="-text">
                  Você substituirá os ativos adicionados anteriormente.
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickImport}
            >
              Importar lista de ativos
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

export default ImportModal;
