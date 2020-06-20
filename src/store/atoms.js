import { atom } from "recoil"

export const saldoState = atom({ key: 'saldoState', default: 200 })

// export const acoesState = atom({ key: 'acoesState', default: []})

export const acoesState = atom({ key: 'acoesState', default: [
    { nome: 'PETR4', nota: 2, preco: 10, quant: 2 },
    { nome: 'SQIA3', nota: 1, preco: 10, quant: 2 },
    { nome: 'IVVB11', nota: 1, preco: 10, quant: 2 },
    { nome: 'CSNA3', nota: 1, preco: 10, quant: 2 },
]})