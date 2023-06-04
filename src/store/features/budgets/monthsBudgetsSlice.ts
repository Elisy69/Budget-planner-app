import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { MonthType } from "../../../types/types";
const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function getMonths(): MonthType[] {
  return months.reduce((acc: MonthType[], currentValue) => {
    return [
      ...acc,
      {
        month: currentValue,
        income: [],
        expenses: [],
        active: false,
        total: 0,
      },
    ];
  }, []);
}

const initialState = getMonths();

const monthsBudgetsSlice = createSlice({
  name: "monthsBudgets",
  initialState,
  reducers: {
    addIncome(state, action) {
      const monthIndex = action.payload.month - 1;
      const updatedMonth = {
        ...state[monthIndex],
        income: [
          ...state[monthIndex].income,
          {
            RUBamount: action.payload.RUBamount,
            USDamount: action.payload.USDamount,
            EURamount: action.payload.EURamount,
            category: action.payload.category,
            commentary: action.payload.commentary,
          },
        ],
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    addExpense(state, action) {
      const monthIndex = action.payload.month - 1;
      const updatedMonth = {
        ...state[monthIndex],
        expenses: [
          ...state[monthIndex].expenses,
          {
            RUBamount: action.payload.RUBamount,
            USDamount: action.payload.USDamount,
            EURamount: action.payload.EURamount,
            category: action.payload.category,
            commentary: action.payload.commentary,
          },
        ],
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    calculateTotal(state, action) {
      const monthIndex = action.payload.month - 1;
      const monthIncome = state[monthIndex].income;
      const monthExpenses = state[monthIndex].expenses;
      const income = monthIncome.reduce(
        (total, item) => {
          return {
            RUB: total.RUB + Number(item.RUBamount),
            USD: total.USD + Number(item.USDamount),
            EUR: total.EUR + Number(item.EURamount),
          };
        },
        { RUB: 0, USD: 0, EUR: 0 }
      );

      const expenses = monthExpenses.reduce(
        (total, item) => {
          return {
            RUB: total.RUB + Number(item.RUBamount),
            USD: total.USD + Number(item.USDamount),
            EUR: total.EUR + Number(item.EURamount),
          };
        },
        { RUB: 0, USD: 0, EUR: 0 }
      );
      const updatedMonth = {
        ...state[monthIndex],
        total: { income, expenses },
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    calculateTotalBudget(state, action) {
      const monthIndex = action.payload.month - 1;
      const income = state[monthIndex].total.income;
      const expenses = state[monthIndex].total.expenses;

      const totalMonth = {
        RUB: income.RUB - expenses.RUB,
        USD: income.USD - expenses.USD,
        EUR: income.EUR - expenses.EUR,
      };

      const updatedMonth = {
        ...state[monthIndex],
        total: { income, expenses, totalMonth },
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    select(state, action) {
      const monthIndex = action.payload;
      const updatedState = state.map((month, index) => {
        if (index === monthIndex) {
          return {
            ...month,
            active: true,
          };
        } else return { ...month, active: false };
      });

      return updatedState;
    },
    unselect(state, action) {
      const monthIndex = action.payload;
      const updatedState = state.map((month, index) => {
        if (index === monthIndex) {
          return {
            ...month,
            active: false,
          };
        } else return { ...month, active: false };
      });

      return updatedState;
    },
  },
});

export const {
  addIncome,
  addExpense,
  calculateTotal,
  calculateTotalBudget,
  select,
  unselect,
} = monthsBudgetsSlice.actions;

export default monthsBudgetsSlice.reducer;
