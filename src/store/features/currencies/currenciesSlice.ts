import { createSlice } from "@reduxjs/toolkit";

export type Currencies = "₽" | "$" | "€";
interface Currency {
  currentCurrency: Currencies;
  rate: { USD: number; EUR: number };
}

const initialState: Currency = {
  currentCurrency: "₽",
  rate: { USD: 0, EUR: 0 },
};

function nextCurrency(currentCurrency: Currencies): Currencies {
  switch (currentCurrency) {
    case "₽":
      return "$";
    case "$":
      return "€";
    case "€":
      return "₽";
  }
}

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialState,
  reducers: {
    loadRates(state, action) {
      return {
        ...state,
        rate: {
          ...state.rate,
          USD: action.payload.USD,
          EUR: action.payload.EUR,
        },
      };
    },
    changeCurrency(state) {
      return {
        ...state,
        currentCurrency: nextCurrency(state.currentCurrency),
      };
    },
  },
});

export const { loadRates, changeCurrency } = currenciesSlice.actions;

export default currenciesSlice.reducer;
