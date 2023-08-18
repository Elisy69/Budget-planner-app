import { nanoid } from "@reduxjs/toolkit";
import { MonthType } from "../../store/features/budgets/monthsBudgetsSlice";
import { useAppSelector } from "../../store/hooks";
import BudgetItem from "./BudgetItem";
import SubmitForm from "./SubmitForm";
interface BudgetSheetProps {
  isIncome: boolean;
}

function BudgetSheet({ isIncome }: BudgetSheetProps) {
  const incomeCategories = useAppSelector((state) => state.categories.income);
  const expensesCategories = useAppSelector(
    (state) => state.categories.expenses
  );
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );

  function renderIncome(month: MonthType | undefined) {
    if (month !== undefined && incomeCategories.length !== 0) {
      return month.income.map((income) => {
        return <BudgetItem key={nanoid()} item={income} isIncome={isIncome} />;
      });
    } else {
      console.log("wainting for month to be selected...");
    }
  }
  function renderExpenses(month: MonthType | undefined) {
    if (month !== undefined && expensesCategories.length !== 0) {
      return month.expenses.map((expenses) => {
        return (
          <BudgetItem key={nanoid()} item={expenses} isIncome={isIncome} />
        );
      });
    } else {
      console.log("wainting for month to be selected...");
    }
  }

  return (
    <div
      className={`${
        isIncome ? `text-green-500` : `text-red-500`
      } w-full sm:w-[80%]  md:w-[70%] lg:w-[60%] xl:w-[50%] self-center mb-4`}
    >
      <h1 className="flex">
        <span className="text-2xl md:text-3xl lg:text-4xl">
          {isIncome ? `Income` : `Expenses`}
        </span>
      </h1>
      <div className="border-b border-gray-600 w-full"></div>
      <nav className="mt-2 flex text-gray-400 mb-2 place-content-between text-xs sm:text-base">
        <span className="w-5/12">Amount</span>
        <span className="w-3/12">Category</span>
        <span className="w-4/12 pl-4">Commentary</span>
      </nav>
      <div className="flex flex-col gap-y-1">
        {isIncome ? renderIncome(month) : renderExpenses(month)}
      </div>
      <SubmitForm isIncome={isIncome} />
    </div>
  );
}

export default BudgetSheet;
