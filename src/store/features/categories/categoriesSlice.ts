import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getNetIncome } from "../../../helpers/getNetIncome";
import { Total } from "../budgets/monthsBudgetsSlice";
export interface CategoryItem {
  title: string;
  id: string;
}
export interface Categories {
  income: CategoryItem[];
  expenses: CategoryItem[];
  netIncome: Total;
}

const myIncome: string[] = [
  "Salary",
  "Passive income",
  "Sold car",
  "Wife salary",
];
const myExpenses: string[] = [
  "Rent",
  "Interest payment",
  "Food",
  "Travel",
  "Bought Macbook",
];

const income: CategoryItem[] = myIncome.map((item) => ({
  title: item,
  id: nanoid(),
}));
const expenses: CategoryItem[] = myExpenses.map((item) => ({
  title: item,
  id: nanoid(),
}));

const initialState: Categories = {
  income: income,
  expenses: expenses,
  netIncome: { RUB: 0, USD: 0, EUR: 0 },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addNewIncomeCategory(state, action) {
      return {
        ...state,
        income: [...state.income, { title: action.payload, id: nanoid() }],
      };
    },
    addNewExpensesCategory(state, action) {
      return {
        ...state,
        expenses: [...state.expenses, { title: action.payload, id: nanoid() }],
      };
    },
    onChangeIncomeCategories(state, action) {
      return {
        ...state,
        income: state.income.map((item) => {
          return item.id === action.payload.id
            ? { title: action.payload.title, id: action.payload.id }
            : item;
        }),
      };
    },
    onChangeExpensesCategories(state, action) {
      return {
        ...state,
        expenses: state.expenses.map((item) => {
          return item.id === action.payload.id
            ? { title: action.payload.title, id: action.payload.id }
            : item;
        }),
      };
    },
    deleteCategory(state, action) {
      return action.payload.isIncome
        ? {
            ...state,
            income: state.income.filter(
              (item) => item.id !== action.payload.id
            ),
          }
        : {
            ...state,
            expenses: state.expenses.filter(
              (item) => item.id !== action.payload.id
            ),
          };
    },
    updateNetIncome(state, action) {
      return {
        ...state,
        netIncome: getNetIncome(action.payload.months),
      };
    },
  },
});

export const {
  addNewIncomeCategory,
  addNewExpensesCategory,
  onChangeIncomeCategories,
  onChangeExpensesCategories,
  deleteCategory,
  updateNetIncome,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
