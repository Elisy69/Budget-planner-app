import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../store/hooks";
import BudgetItem from "./BudgetItem";
import SubmitForm from "./SubmitForm";

interface BudgetSheetProps {
  isIncome: Boolean;
}

function BudgetSheet({ isIncome }: BudgetSheetProps) {
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );

  function renderIncome(month) {
    if (month !== undefined) {
      return month.income.map((income) => {
        return <BudgetItem key={nanoid()} item={income} isIncome={isIncome} />;
      });
    } else {
      console.log("wainting for month to be selected...");
    }
  }
  function renderExpenses(month) {
    if (month !== undefined) {
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
      className={`${isIncome ? `text-green-500` : `text-red-500`} w-full mb-10`}
    >
      <h1 className="flex">
        <span className="text-2xl">{isIncome ? `Income` : `Expenses`}</span>
      </h1>
      <div className="border-b border-gray-600 w-full"></div>
      <nav className="mt-2 flex text-gray-400 mb-2 place-content-between text-xs sm:text-base">
        <span className="w-2/6">Amount</span>
        <span className="w-1/6">Category</span>
        <span className="w-3/6 pl-4">Commentary</span>
      </nav>
      <div className="flex flex-col gap-y-6">
        {isIncome ? renderIncome(month) : renderExpenses(month)}
      </div>
      <SubmitForm isIncome={isIncome} />
    </div>
  );
}

export default BudgetSheet;
