import { createSelector } from "@reduxjs/toolkit";
import { BudgetItem, MonthType } from "../../../types/types";

export const selectBudgetItemsWithCategory = createSelector(
  [(state) => state.budgets, (state, type) => type],
  (budgets, type) => {
    return budgets
      .filter((month: MonthType) => month[type].length !== 0)
      .map((item: BudgetItem) => ({ [type]: item[type] }))
      .flatMap((item: BudgetItem) => item[type])
      .map((item: BudgetItem) => ({
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
