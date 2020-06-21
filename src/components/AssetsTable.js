import React from 'react'
import { useRecoilState } from "recoil";
import { FiPlusCircle } from 'react-icons/fi'

import AssetModal from './AssetModal'

import { saldoState, acoesState } from '../store/atoms'

const AssetsTable = () => {
    const [saldo,] = useRecoilState(saldoState);
    const [acoes, setAcoes] = useRecoilState(acoesState);

    const handleGetAcao = (name) => {
        const acao = acoes.find(acao => acao.name === name)
        const totalPreco = acoes.reduce((total, acao) => total + (acao.quant * acao.preco), 0)
        const totalNota = acoes.reduce((total, acao) => total + (acao.nota), 0)
    
        return ({
            name: acao.name,
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

    const handleClickRemover = (name) => {
        setAcoes(acoes.filter(acao => acao.name !== name))
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
                <div key={acao.name} className="card card-body pointer mt-1">
                    <div className="row">
                        <div className="col-2">{handleGetAcao(acao.name).name}</div>
                        <div className="col-1">{handleGetAcao(acao.name).nota}</div>
                        <div className="col-2 border-right">{handleGetAcao(acao.name).preco}</div>
                        <div className="col-1">{handleGetAcao(acao.name).quantAtual}</div>
                        <div className="col-1">{handleGetAcao(acao.name).totalAtual}</div>
                        <div className="col-1 border-right">{handleGetAcao(acao.name).percentAtual}%</div>
                        <div className="col-1">{handleGetAcao(acao.name).quantIdeal}</div>
                        <div className="col-1">{handleGetAcao(acao.name).totalIdeal}</div>
                        <div className="col-1 border-right">{handleGetAcao(acao.name).percentIdeal}%</div>
                        <div className="col-1">{handleGetAcao(acao.name).status}</div>
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