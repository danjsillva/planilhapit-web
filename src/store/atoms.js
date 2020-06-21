import { atom } from "recoil"

export const saldoState = atom({ key: 'saldoState', default: 200 })

// export const acoesState = atom({ key: 'acoesState', default: []})

export const acoesState = atom({ key: 'acoesState', default: [
    { name: 'PETR4', nota: 2, preco: 10, quant: 6 },
    { name: 'SQIA3', nota: 1, preco: 10, quant: 2 },
    { name: 'IVVB11', nota: 1, preco: 10, quant: 2 },
    { name: 'CSNA3', nota: 1, preco: 10, quant: 2 },
]})