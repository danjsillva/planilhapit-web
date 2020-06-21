import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import axios from 'axios'

import { saldoState, acoesState } from '../store/atoms'

const AssetForm = () => {
    const [acao, setAcao] = useState({ nome: 'BIDI3', nota: 3, quant: 2, preco: 0 })
    const [saldo, setSaldo] = useRecoilState(saldoState);
    const [acoes, setAcoes] = useRecoilState(acoesState);

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        const response = (await axios.get(`https://blxskdikk0.execute-api.sa-east-1.amazonaws.com/dev/quotation?label=${acao.nome}`)).data

        setAcoes([...acoes, { ...acao, preco: response[acao.nome].price }])
        setAcao({ nome: '', nota: 0, quant: 0 })
    }

    return (
        <div className="modal" id="assetModal">
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
                                <div className="col">
                                    <input value={acao.nome} onChange={e => setAcao({ ...acao, nome: e.target.value})} className="form-control" />
                                </div>
                                <div className="col">
                                    <input value={acao.nota} onChange={e => setAcao({ ...acao, nota: e.target.value})} className="form-control" />
                                </div>
                                <div className="col">
                                    <input value={acao.quant} onChange={e => setAcao({ ...acao, quant: e.target.value})} className="form-control" />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary">Salvar alterações</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetForm