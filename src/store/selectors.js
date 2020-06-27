import { selector } from "recoil"

import { balanceState, stockListState } from "../store/atoms"

export const fullStockListState = selector({
  key: 'fullStockListState',
  get: async ({ get }) => {
    const stockList = get(stockListState);
    const balance = get(balanceState);
    const totalPrice = stockList.reduce(
      (total, stock) => total + stock.volume * stock.price,
      0
    );
    const totalGrade = stockList.reduce(
      (total, stock) => total + stock.grade,
      0
    );

    return stockList.map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      grade: parseInt(stock.grade),
      price: parseFloat(stock.price),
      volume: parseInt(Math.floor(stock.volume)),
      total: parseFloat(stock.volume * stock.price),
      percent: parseFloat(
        ((stock.volume * stock.price) / totalPrice) * 100
      ),
      idealVolume: parseInt(
        Math.floor(((stock.grade / totalGrade) * balance) / stock.price)
      ),
      idealTotal: parseFloat(
        Math.floor(((stock.grade / totalGrade) * balance) / stock.price) *
          stock.price
      ),
      idealPercent: parseFloat((stock.grade / totalGrade) * 100),
      status:
        ((stock.grade / totalGrade) * balance) / stock.price > stock.volume,
    }))
  }
});