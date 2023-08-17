import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeGoalGroup } from "../../store/features/budgetGoals/budgetGoalsSlice";
import { updateNetIncome } from "../../store/features/categories/categoriesSlice";
import { useAppSelector } from "../../store/hooks";
import GroupItem from "./GroupItem";
import { getCategoryTotalBasedOnCurrency } from "/src/helpers/getTotalBasedOnCurrency.ts";

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};
type Goal = {
  title: string;
  amount: Total;
};

interface GoalGroup {
  id: string;
  items: Goal[];
  index: number;
}
function getGoalsGroupTotal(items: Goal[]) {
  return items.reduce(
    (total, item) => {
      return {
        ...total,
        RUB: total.RUB + item.amount.RUB,
        USD: total.USD + item.amount.USD,
        EUR: total.EUR + item.amount.EUR,
      };
    },
    { RUB: 0, USD: 0, EUR: 0 }
  );
}

function renderVerticalLine() {
  return <div className="border border-gray-600 "></div>;
}

function getMonthsToReachGoals(budgetGroupTotal, netIncomeData) {
  return (budgetGroupTotal.RUB / netIncomeData.RUB).toFixed(1);
}

function BudgetGoalGroup({ items, id, index }: GoalGroup) {
  const months = useAppSelector((state) => state.budgets);
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const netIncomeData = useAppSelector((state) => state.categories.netIncome);
  const [budgetGroupTotal, setBudgetGroupTotal] = useState<Total>();
  const [monthsToReachGoals, setMonthsToReachGoals] = useState<number>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNetIncome({
        months,
      })
    );
  }, [months]);

  useEffect(() => {
    setBudgetGroupTotal(getGoalsGroupTotal(items));
  }, []);

  useEffect(() => {
    budgetGroupTotal === undefined
      ? ""
      : setMonthsToReachGoals(
          getMonthsToReachGoals(budgetGroupTotal, netIncomeData)
        );
  }, [budgetGroupTotal]);

  function handleRemoveGroup() {
    return dispatch(removeGoalGroup({ id }));
  }

  return (
    <div className="flex flex-col gap-6 mt-4 w-[90%] sm:w-[60%] xl:w-[40%] border-4 border-solid rounded-xl border-gray-600 p-2">
      <nav className="flex">
        <h1>Budget goals group - {index + 1}</h1>
        <button
          onClick={handleRemoveGroup}
          className="ml-auto leading-3 hover:bg-gray-400 hover:bg-opacity-40 cursor-pointer text-xl rounded-full h-6 w-6 active:bg-gray-100"
        >
          ✕
        </button>
      </nav>
      <div className="flex flex-col gap-4 ">
        {items.map((item: Goal) => (
          <GroupItem title={item.title} amount={item.amount} key={nanoid()} />
        ))}
      </div>
      {renderVerticalLine()}
      <div className="mb-4">
        With a monthly net income of{" "}
        <span className="text-amber-400 text-xl">{currency} </span>
        <span className="text-white text-xl">
          {getCategoryTotalBasedOnCurrency(netIncomeData, currency)}{" "}
        </span>
        it would take{" "}
        <span className="text-blue-300 text-lg">
          {monthsToReachGoals} months
        </span>{" "}
        to achieve these financial goals.
      </div>
    </div>
  );
}

export default BudgetGoalGroup;
