import { atom } from "recoil";

export const balanceState = atom({ key: "balanceState", default: 200 });

export const stockListState = atom({ key: "stockListState", default: [] });

// export const stockListState = atom({ key: 'stockListState', default: [
//     { name: 'PETR4', grade: 2, preco: 10, quant: 6 },
//     { name: 'SQIA3', grade: 1, preco: 10, quant: 2 },
//     { name: 'IVVB11', grade: 1, preco: 10, quant: 2 },
//     { name: 'CSNA3', grade: 1, preco: 10, quant: 2 },
// ]})
