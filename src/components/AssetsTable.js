import React from 'react'
import { useRecoilState } from "recoil";
import { FiPlusCircle } from 'react-icons/fi'

import AssetModal from './AssetModal'

import { saldoState, acoesState } from '../store/atoms'

const AssetsTable = () => {
    const [saldo,] = useRecoilState(saldoState);
    const [acoes, setAcoes] = useRecoilState(acoesState);

    const handleGetAcao = (nome) => {
        const acao = acoes.find(acao => acao.nome === nome)
        const totalPreco = acoes.reduce((total, acao) => total + (acao.quant * acao.preco), 0)
        const totalNota = acoes.reduce((total, acao) => total + (acao.nota), 0)
    
        return ({
            nome: acao.nome,
            nota: acao.nota,
            preco: (acao.preco).toFixed(2),
            quantAtual: Math.floor(acao.quant),
            totalAtual: (acao.quant * acao.preco).toFixed(2),
            percentAtual: (acao.quant * acao.preco / totalPreco * 100).toFixed(1),
            quantIdeal: Math.floor((acao.nota / totalNota) * saldo / acao.preco),
            totalIdeal: ((acao.nota / totalNota) * saldo).toFixed(2),
            percentIdeal: (acao.nota / totalNota * 100).toFixed(1),
            status: ((acao.nota / totalNota) * saldo / acao.preco) > acao.quant ? 'S' : 'N'
        })
    }

    const handleClickRemover = (nome) => {
        setAcoes(acoes.filter(acao => acao.nome !== nome))
    }

    return (
        <div className="">
            <AssetModal />
            
            <div className="card card-body font-weight-bold">
                <div className="row">
                    <div className="col-5 border-right text-center">Ativo</div>
                    <div className="col-3 border-right text-center">Posição Atual</div>
                    <div className="col-3 border-right text-center">Posição Ideal</div>
                    <div className="col-1 text-center">Ação</div>
                </div>
            </div>

            {acoes.map(acao => (
                <div key={acao.nome} className="card card-body pointer mt-1">
                    <div className="row">
                        <small className="col-2">{handleGetAcao(acao.nome).nome}</small>
                        <small className="col-1">{handleGetAcao(acao.nome).nota}</small>
                        <small className="col-2 border-right">{handleGetAcao(acao.nome).preco}</small>
                        <small className="col-1">{handleGetAcao(acao.nome).quantAtual}</small>
                        <small className="col-1">{handleGetAcao(acao.nome).totalAtual}</small>
                        <small className="col-1 border-right">{handleGetAcao(acao.nome).percentAtual}%</small>
                        <small className="col-1">{handleGetAcao(acao.nome).quantIdeal}</small>
                        <small className="col-1">{handleGetAcao(acao.nome).totalIdeal}</small>
                        <small className="col-1 border-right">{handleGetAcao(acao.nome).percentIdeal}%</small>
                        <small className="col-1">{handleGetAcao(acao.nome).status}</small>
                    </div>
                </div>
            ))}

            <div className="card card-body pointer mt-1" data-toggle="modal" data-target="#assetModal">
                <div className="row">
                    <div className="col text-center">
                        <FiPlusCircle />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetsTable