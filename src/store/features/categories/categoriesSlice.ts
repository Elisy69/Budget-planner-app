import { createSlice } from "@reduxjs/toolkit";

interface Categories {
  income: string[];
  expenses: string[];
}

const initialState: Categories = {
  income: ["salary", "help from parents", "initial funds", "selling", "other"],
  expenses: [
    "rent",
    "food",
    "tickets",
    "buying something",
    "medicine",
    "documents",
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addNewIncomeCategory(state, action) {
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    },
  },
});

export const { addNewIncomeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
