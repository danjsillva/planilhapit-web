import React from 'react'
import { useRecoilState } from "recoil";

import { saldoState, acoesState } from '../store/atoms'

import { Button } from '../styles/form'
import { Row } from '../styles/table'

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
        <>
            {acoes.map(acao => (
                <Row key={acao.nome}>
                    <div>{handleGetAcao(acao.nome).nome}</div>
                    <div>{handleGetAcao(acao.nome).nota}</div>
                    <div>{handleGetAcao(acao.nome).preco}</div>
                    <div>{handleGetAcao(acao.nome).quantAtual}</div>
                    <div>{handleGetAcao(acao.nome).totalAtual}</div>
                    <div>{handleGetAcao(acao.nome).percentAtual}</div>
                    <div>{handleGetAcao(acao.nome).quantIdeal}</div>
                    <div>{handleGetAcao(acao.nome).totalIdeal}</div>
                    <div>{handleGetAcao(acao.nome).percentIdeal}</div>
                    <div>{handleGetAcao(acao.nome).status}</div>
                    <div>
                        <Button onClick={e => handleClickRemover(acao.nome)}>Remover</Button>
                    </div>
                </Row>
            ))}
        </>
        // <table style={{ width: '100%' }}>
        //     <thead>
        //         <tr>
        //             <td>Ativo</td>
        //             <td>Nota</td>
        //             <td>Preço</td>
        //             <td>Quant</td>
        //             <td>Total</td>
        //             <td>Porcentagem</td>
        //             <td>Quant</td>
        //             <td>Total</td>
        //             <td>Porcentagem</td>
        //             <td>Comprar</td>
        //             <td>Ação</td>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {acoes.map(acao => (
        //             <tr key={acao.nome}>
        //                 <td>{handleGetAcao(acao.nome).nome}</td>
        //                 <td>{handleGetAcao(acao.nome).nota}</td>
        //                 <td>{handleGetAcao(acao.nome).preco}</td>
        //                 <td>{handleGetAcao(acao.nome).quantAtual}</td>
        //                 <td>{handleGetAcao(acao.nome).totalAtual}</td>
        //                 <td>{handleGetAcao(acao.nome).percentAtual}</td>
        //                 <td>{handleGetAcao(acao.nome).quantIdeal}</td>
        //                 <td>{handleGetAcao(acao.nome).totalIdeal}</td>
        //                 <td>{handleGetAcao(acao.nome).percentIdeal}</td>
        //                 <td>{handleGetAcao(acao.nome).status}</td>
        //                 <td>
        //                     <button onClick={e => handleClickRemover(acao.nome)}>Remover</button>
        //                 </td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>
    )
}

export default AssetsTable