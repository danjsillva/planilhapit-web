import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import axios from 'axios'

import { saldoState, acoesState } from '../store/atoms'

import { Input, Button } from '../styles/form'

const AssetForm = () => {
    const [acao, setAcao] = useState({ nome: 'BIDI3', nota: 3, quant: 2, preco: 0 })
    const [saldo, setSaldo] = useRecoilState(saldoState);
    const [acoes, setAcoes] = useRecoilState(acoesState);

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        const response = (await axios.get(`http://localhost:3001/assets/${acao.nome}`)).data

        setAcoes([...acoes, { ...acao, preco: response.price }])
        setAcao({ nome: '', nota: 0, quant: 0 })
    }

    return (
        <div>
            <form>
                <Input value={saldo} onChange={e => setSaldo(e.target.value)} />
                <Input value={acoes.reduce((total, acao) => total + (acao.preco * acao.quant), 0)} readOnly />
            </form>

            <form onSubmit={handleSubmitForm}>
                <Input value={acao.nome} onChange={e => setAcao({ ...acao, nome: e.target.value})} />
                <Input value={acao.nota} onChange={e => setAcao({ ...acao, nota: e.target.value})} />
                <Input value={acao.quant} onChange={e => setAcao({ ...acao, quant: e.target.value})} />
                <Button type="submit">Adicionar</Button>
            </form>
        </div>
    )
}

export default AssetForm