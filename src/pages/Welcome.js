import React from "react";
import { Link } from "react-router-dom";

import DevelopedBy from "../components/DevelopedBy";

const Welcome = () => {
  return (
    <div
      className="container d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-4">
          <h1>
            Bem vindo à <b>Planilha Pit</b>!
          </h1>
          <h4>A ferramenta que vai te ajudar a rebalancear sua carteira</h4>

          <p className="text-muted py-4">
            Este é o resultado de uma ideia que nasceu com o propósito de ser
            uma ferramenta para uso pessoal, mas agora ficou claro que pode
            ajudar outras pessoas. Enfim, espero que curtam!
          </p>

          <div className="">
            <Link to="/stocks" className="btn btn-dark px-5">
              Ir para a planilha
            </Link>
          </div>

          <div className="mt-5">
            <DevelopedBy />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Welcome;
