import { atom } from "recoil";

export const balanceState = atom({ key: "balanceState", default: 0 });

export const stockListState = atom({ key: "stockListState", default: [] });

// export const stockListState = atom({ key: 'stockListState', default: [
//     { symbol: 'PETR4', name: 'Petroleo Brasileiro SA Petrobras Preference Shares', grade: 2, price: 10, volume: 6 },
//     { symbol: 'SQIA3', name: 'Sinqia SA', grade: 1, price: 10, volume: 2 },
//     { symbol: 'IVVB11', name: 'ISHARESSPDGG/Ut BRL', grade: 1, price: 10, volume: 2 },
//     { symbol: 'CSNA3', name: 'Companhia Siderurgica Nacional', grade: 1, price: 10, volume: 2 },
// ]})
