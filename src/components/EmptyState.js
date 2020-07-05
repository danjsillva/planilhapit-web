import React from "react";
import { FiList } from "react-icons/fi";

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

export default EmptyState;
