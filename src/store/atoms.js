import { atom } from "recoil";

export const saldoState = atom({ key: "saldoState", default: 200 });

export const assetsState = atom({ key: "assetsState", default: [] });

// export const assetsState = atom({ key: 'assetsState', default: [
//     { name: 'PETR4', grade: 2, preco: 10, quant: 6 },
//     { name: 'SQIA3', grade: 1, preco: 10, quant: 2 },
//     { name: 'IVVB11', grade: 1, preco: 10, quant: 2 },
//     { name: 'CSNA3', grade: 1, preco: 10, quant: 2 },
// ]})
