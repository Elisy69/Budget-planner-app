import { useState } from "react";
import {
  calculateAccounts,
  calculateTotalRevenue,
  removeBudgetItem,
} from "../store/features/budgets/monthsBudgetsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type BudgetItem = {
  RUBamount: Number;
  USDamount: Number;
  EURamount: Number;
  category: String;
  commentary: String;
};

interface BudgetItemProps {
  item: {
    id: String;
    RUBamount: Number;
    USDamount: Number;
    EURamount: Number;
    category: String;
    commentary: String;
  };
  isIncome: Boolean;
}

function BudgetItem({ item, isIncome }: BudgetItemProps) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );
  const [isCommExpanded, setCommExpanded] = useState(false);
  const dispatch = useAppDispatch();
  function getAmount(item: BudgetItem) {
    switch (currency) {
      case "₽": {
        return item.RUBamount;
      }
      case "$": {
        return item.USDamount;
      }
      case "€": {
        return item.EURamount;
      }
    }
  }

  function handleCommExpansion() {
    setCommExpanded(!isCommExpanded);
  }
  function handleDeleteItem() {
    dispatch(
      removeBudgetItem({
        monthIndex: month.month - 1,
        budgetType: isIncome ? "income" : "expenses",
        id: item.id,
      })
    );

    dispatch(
      calculateAccounts({
        month: month.month,
      })
    );
    dispatch(calculateTotalRevenue({ month: month.month }));
  }

  return (
    <div
      key={crypto.randomUUID()}
      className="relative flex rounded-lg hover:outline hover:outline-1 hover:outline-offset-4 group"
    >
      <span className="w-2/6">
        <span className="">+ </span>
        <span className="">
          {currency} {getAmount(item)}
        </span>
      </span>

      <span className="w-1/6 text-xs sm:text-base">{item.category}</span>

      <div
        onClick={() => {
          handleCommExpansion();
        }}
        className={`${
          isCommExpanded ? `` : `line-clamp-3 text-ellipsis`
        } w-3/6 pl-4 pr-2 text-[0.7rem] hover:cursor-pointer`}
      >
        {item.commentary}
      </div>
      <button
        onClick={() => {
          handleDeleteItem();
        }}
        className="absolute group-hover:block hidden rounded-full border hover:bg-red-400 border-red-900 bg-red-700 text-white top-[-20%] left-[98%] w-4 h-4 leading-3 text-xs"
      >
        ✖
      </button>
    </div>
  );
}

export default BudgetItem;
