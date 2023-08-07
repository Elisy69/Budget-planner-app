import { createSlice, nanoid } from "@reduxjs/toolkit";

const myIncome = [
  "salary",
  "help from parents",
  "initial funds",
  "selling",
  "other",
];
const myExpenses = [
  "rent",
  "food",
  "tickets",
  "buying something",
  "medicine",
  "documents",
];

const income = myIncome.map((item) => ({ title: item, id: nanoid() }));
const expenses = myExpenses.map((item) => ({ title: item, id: nanoid() }));

type CategoryItem = {
  title: string;
  id: string;
};
interface Categories {
  income: CategoryItem[];
  expenses: CategoryItem[];
}

const initialState: Categories = {
  income: income,
  expenses: expenses,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
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
  },
});

export const {
  addNewIncomeCategory,
  addNewExpensesCategory,
  onChangeIncomeCategories,
  onChangeExpensesCategories,
  deleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
