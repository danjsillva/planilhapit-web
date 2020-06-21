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
        <div className="">
            <div className="card card-body">
                <div className="row">
                    <div className="col-12">
                        <input value={saldo} onChange={e => setSaldo(e.target.value)} className="form-control" autoFocus />
                    </div>
                    <div className="col-12">
                        <input value={acoes.reduce((total, acao) => total + (acao.preco * acao.quant), 0)} className="form-control" readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetForm