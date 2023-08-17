import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoriesAnalysis from "../Components/BudgetAnalysis/CategoriesAnalysis";
import NetIncome from "../Components/BudgetAnalysis/NetIncome";
import { areCategoriesEmpty } from "../store/selectors";

function renderIfNoCategories(isThereIncome, areThereExpenses) {
  return isThereIncome && areThereExpenses ? (
    <h2 className="text-center text-2xl mt-20">Add your categories!</h2>
  ) : (
    ""
  );
}

function renderIncome(isThereIncome, areThereExpenses) {
  if (isThereIncome && areThereExpenses) return;
  return isThereIncome ? (
    <div className="text-center text-4xl mt-4">Add income categories!</div>
  ) : (
    <CategoriesAnalysis type={"income"} isIncome={true} />
  );
}

function renderExpenses(isThereIncome, areThereExpenses) {
  if (isThereIncome && areThereExpenses) return;
  return areThereExpenses ? (
    <div className="text-center text-4xl mt-4">Add expenses categories!</div>
  ) : (
    <CategoriesAnalysis type={"expenses"} isIncome={false} />
  );
}

function BudgetAnalysis() {
  const areThereExpenses = useSelector((state) =>
    areCategoriesEmpty(state, "expenses")
  );
  const isThereIncome = useSelector((state) =>
    areCategoriesEmpty(state, "income")
  );

  return (
    <div className="w-full h-content flex flex-col mb-10">
      <h1 className="text-center text-4xl mt-4">Budget Analysis</h1>
      {renderIfNoCategories(isThereIncome, areThereExpenses)}
      {renderIncome(isThereIncome, areThereExpenses)}
      {renderExpenses(isThereIncome, areThereExpenses)}
      <NetIncome />
    </div>
  );
}

export default BudgetAnalysis;
