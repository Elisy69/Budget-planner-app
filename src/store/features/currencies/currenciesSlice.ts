import { createSlice } from "@reduxjs/toolkit";

interface Currency {
  currentCurrency: string;
  rate: { USD: number; EUR: number };
}

const initialState: Currency = {
  currentCurrency: "₽",
  rate: { USD: 0, EUR: 0 },
};

function nextCurrency(currentCurrency: string): string {
  switch (currentCurrency) {
    case "₽":
      return "$";
    case "$":
      return "€";
    case "€":
      return "₽";
    default:
      return "error";
  }
}

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
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
