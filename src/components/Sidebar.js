import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import axios from 'axios'
import { PieChart, Pie, Sector } from 'recharts';

import { saldoState, acoesState } from '../store/atoms'

const AssetForm = () => {
    const [acao, setAcao] = useState({ name: 'BIDI3', nota: 3, quant: 2, preco: 0 })
    const [saldo, setSaldo] = useRecoilState(saldoState);
    const [acoes, setAcoes] = useRecoilState(acoesState);

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        const response = (await axios.get(`https://blxskdikk0.execute-api.sa-east-1.amazonaws.com/dev/quotation?label=${acao.name}`)).data

        setAcoes([...acoes, { ...acao, preco: response[acao.name].price }])
        setAcao({ name: '', nota: 0, quant: 0 })
    }

    return (
        <div className="">
            <div className="card card-body">
                <div className="row">
                    <div className="col-6 col-lg-12">
                        <label htmlFor="">Saldo</label>
                        <input value={saldo} onChange={e => setSaldo(e.target.value)} className="form-control" autoFocus />
                        <div class="form-text">Seu saldo total na corretora.</div>
                    </div>
                    <div className="col-6 col-lg-12 mt-3">
                        <label htmlFor="">Total investido</label>
                        <input value={acoes.reduce((total, acao) => total + (acao.preco * acao.quant), 0)} className="form-control" readOnly />
                    </div>
                </div>
            </div>

            <div className="card card-body mt-1">
                <div className="text">Total de papéis: {acoes.length}</div>
                <div className="text">Papel com maior quantidade: {acoes[0].name}</div>
                <div className="text">Papel com maior total: {acoes[0].name}</div>
                <div className="text">Papel com maior porcentagem: {acoes[0].name}</div>
            </div>
        </div>
    )
}

export default AssetForm