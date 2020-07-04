import { selector } from "recoil";

import { balanceState, stockListState } from "../store/atoms";

export const stockListTotalState = selector({
  key: "stockListTotalState",
  get: ({ get }) => {
    const stockList = get(stockListState);

    return stockList.reduce(
      (total, stock) => total + stock.price * stock.volume,
      0
    );
  },
});

export const stockListIdealTotalState = selector({
  key: "stockListIdealTotalState",
  get: ({ get }) => {
    const stockList = get(stockListFullState);

    return stockList.reduce(
      (total, stock) => total + stock.price * stock.idealVolume,
      0
    );
  },
});

export const stockListFullState = selector({
  key: "stockListFullState",
  get: ({ get }) => {
    const stockList = get(stockListState);
    const balance = get(balanceState);
    const totalPrice = stockList.reduce(
      (total, stock) =>
        total + parseInt(Math.floor(stock.volume)) * parseFloat(stock.price),
      0
    );
    const totalGrade = stockList.reduce(
      (total, stock) => total + parseInt(stock.grade),
      0
    );

    return stockList.map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      grade: parseInt(stock.grade),
      price: parseFloat(stock.price),
      volume: parseInt(Math.floor(stock.volume)),
      total: parseFloat(
        parseInt(Math.floor(stock.volume)) * parseFloat(stock.price)
      ),
      percent: parseFloat(
        ((parseInt(Math.floor(stock.volume)) * parseFloat(stock.price)) /
          parseFloat(totalPrice)) *
          100
      ),
      idealVolume: parseInt(
        Math.floor(
          ((parseInt(stock.grade) / parseFloat(totalGrade)) *
            parseFloat(balance)) /
            parseFloat(stock.price)
        )
      ),
      idealTotal: parseFloat(
        Math.floor(
          ((parseInt(stock.grade) / parseFloat(totalGrade)) *
            parseFloat(balance)) /
            parseFloat(stock.price)
        ) * parseFloat(stock.price)
      ),
      idealPercent: parseFloat(
        (parseInt(stock.grade) / parseFloat(totalGrade)) * 100
      ),
      differenceVolume:
        parseInt(
          Math.floor(
            ((parseInt(stock.grade) / parseFloat(totalGrade)) *
              parseFloat(balance)) /
              parseFloat(stock.price)
          )
        ) - parseInt(Math.floor(stock.volume)),
      differenceTotal: parseInt(
        Math.floor(
          ((parseInt(stock.grade) / parseFloat(totalGrade)) *
            parseFloat(balance)) /
            parseFloat(stock.price)
        ) *
          parseFloat(stock.price) -
          parseFloat(
            parseInt(Math.floor(stock.volume)) * parseFloat(stock.price)
          )
      ),
    }));
  },
});
