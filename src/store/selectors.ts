import { createSelector } from "@reduxjs/toolkit";
import { MonthType } from "./features/budgets/monthsBudgetsSlice";

type Type = "income" | "expenses";

export const selectBudgetItemsWithCategory = createSelector(
  [(state) => state.budgets, (state, type: Type) => type],
  (budgets: MonthType[], type) => {
    return budgets
      .filter((month) => month[type].length !== 0)
      .map((item) => ({ [type]: item[type] }))
      .flatMap((item) => item[type])
      .map((item) => ({
        EUR: item.EURamount,
        RUB: item.RUBamount,
        USD: item.USDamount,
        categoryId: item.categoryId,
      }));
  }
);

export const selectBudgetCategories = createSelector(
  [(state) => state.categories, (state, type) => type],
  (categories, type) => {
    return categories[type];
  }
);

export const areCategoriesEmpty = createSelector(
  [(state) => state.categories, (state, type) => type],
  (categories, type) => {
    return categories[type].length === 0;
  }
);
