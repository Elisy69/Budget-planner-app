import { createSlice, nanoid } from "@reduxjs/toolkit";
import { el } from "date-fns/locale";
import { MOCK_DATA } from "../../../constants/MOCK_DATA";

interface RemoveBudgetItemPayload {
  id: string;
  budgetType: "income" | "expenses";
  monthIndex: number;
}

interface CopyDataPayload {
  budgetType: "income" | "expenses";
  monthIndex: number;
}

export interface BudgetItemType {
  id: string;
  RUBamount: number;
  USDamount: number;
  EURamount: number;
  categoryId: string;
  commentary: string;
}

export interface Total {
  RUB: number;
  USD: number;
  EUR: number;
}

export interface MonthType {
  month: number;
  income: BudgetItemType[];
  expenses: BudgetItemType[];
  active: boolean;
  total: {
    expenses: Total;
    income: Total;
    totalMonth: Total;
  };
}

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
        total: {
          expenses: { RUB: 0, USD: 0, EUR: 0 },
          income: { RUB: 0, USD: 0, EUR: 0 },
          totalMonth: { RUB: 0, USD: 0, EUR: 0 },
        },
      },
    ];
  }, []);
}

const initialState = getMonths();

const monthsBudgetsSlice = createSlice({
  name: "monthsBudgets",
  initialState,
  reducers: {
    removeBudgetItem(state, action) {
      const { monthIndex, budgetType, id } =
        action.payload as RemoveBudgetItemPayload;
      const updatedBudgetType = state[monthIndex][budgetType].filter(
        (item: BudgetItemType) => item.id !== id
      );
      const updatedMonth = {
        ...state[monthIndex],
        [budgetType]: updatedBudgetType,
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    removeBudgetItemsBasedOnCategory(state, action) {
      const { isIncome, id } = action.payload;
      const budgetType = isIncome ? "income" : "expenses";
      const updatedBudgets = state.map((month) => {
        return {
          ...month,
          [budgetType]: month[budgetType].filter(
            (item) => item.categoryId !== id
          ),
        };
      });
      return updatedBudgets;
    },
    addIncome(state, action) {
      const monthIndex = action.payload.month - 1;
      const updatedMonth = {
        ...state[monthIndex],
        income: [
          ...state[monthIndex].income,
          {
            id: nanoid(),
            RUBamount: action.payload.RUBamount,
            USDamount: action.payload.USDamount,
            EURamount: action.payload.EURamount,
            categoryId: action.payload.categoryId,
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
            id: nanoid(),
            RUBamount: action.payload.RUBamount,
            USDamount: action.payload.USDamount,
            EURamount: action.payload.EURamount,
            categoryId: action.payload.categoryId,
            commentary: action.payload.commentary,
          },
        ],
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    calculateAccounts(state, action) {
      const monthIndex = action.payload.month - 1;
      const monthIncome = state[monthIndex].income;
      const monthExpenses = state[monthIndex].expenses;
      const totalMonth = state[monthIndex].total.totalMonth;
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
        total: { income, expenses, totalMonth },
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    },
    calculateTotalRevenue(state, action) {
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
    copyDataToNextMonth(state, action) {
      const { monthIndex, budgetType } = action.payload as CopyDataPayload;
      const currentMonthBudget = state[monthIndex][budgetType];
      const nextMonthBudget = state[monthIndex + 1][budgetType];
      const newItems = currentMonthBudget.filter((item) => {
        return !nextMonthBudget.some(
          (nextMonthItem) =>
            item.RUBamount === nextMonthItem.RUBamount &&
            item.categoryId === nextMonthItem.categoryId &&
            item.commentary === nextMonthItem.commentary
        );
      });
      const updatedBudget = nextMonthBudget.concat(newItems);
      const updatedNextMonth = {
        ...state[monthIndex + 1],
        [budgetType]: updatedBudget,
      };
      const updatedState = [...state];
      updatedState[monthIndex + 1] = updatedNextMonth;
      return updatedState;
    },
    loadMockDataBudgets() {
      return JSON.parse(MOCK_DATA.BUDGETS);
    },
  },
});

export const {
  removeBudgetItem,
  removeBudgetItemsBasedOnCategory,
  addIncome,
  addExpense,
  calculateAccounts,
  calculateTotalRevenue,
  select,
  unselect,
  loadMockDataBudgets,
  copyDataToNextMonth,
} = monthsBudgetsSlice.actions;

export default monthsBudgetsSlice.reducer;
