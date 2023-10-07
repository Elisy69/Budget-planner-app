import { useAppSelector } from "../store/hooks";

export function getCategoryNameById(id: string, isIncome: boolean) {
  const incomeCategories = useAppSelector((state) => state.categories.income);
  const expensesCategories = useAppSelector(
    (state) => state.categories.expenses
  );
  return isIncome
    ? incomeCategories.find((item) => id === item.id)?.title
    : expensesCategories.find((item) => id === item.id)?.title;
}
