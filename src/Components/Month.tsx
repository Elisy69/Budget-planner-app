import React, { forwardRef } from "react";
import { monthNames } from "../helpers/months";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MonthType } from "../types/types";

interface MonthProps {
  data: MonthType;
  isActive: Boolean;
  onSelect: () => void;
  unSelect: () => void;
}

const currencies = {
  "₽": "RUB",
  "$": "USD",
  "€": "EUR",
};

const Month = forwardRef(function Month(
  { data, isActive, onSelect, unSelect }: MonthProps,
  ref
) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  // console.log(data);
  // ВСЕ РАБОТАЕТ!! НО НАПИШИ ФУНКЦИЮ ДЛЯ TOTAL BUDGET
  console.log(data);
  function getCurrencyData(data, budgetCategory) {
    if (typeof data !== "number") {
      return data[budgetCategory][currencies[currency]];
    } else {
      return 0;
    }
  }

  function cssTotal(total) {
    if (total < 0) {
      return <span className="text-red-500">{total}</span>;
    } else if (total > 0) {
      return <span className="text-green-500">+{total}</span>;
    } else {
      return <span className="text-white">{total}</span>;
    }
  }

  return (
    <div
      ref={ref}
      className={`${
        isActive
          ? `z-20 transition translate-x-4 backdrop-blur opacity-95 bg-slate-800 border-gray-900`
          : `z-0  transition duration-200 ease-in-out hover:-translate-y-3`
      } flex flex-col cursor-pointer backdrop-blur-2xl border border-gray-600 rounded-lg shadow-2xl drop-shadow-2xl  opacity-96 bg-slate-700 relative  ml-[0.6rem] mt-[-10.4rem] w-[14rem] h-[13rem] `}
      onClick={isActive ? unSelect : onSelect}
    >
      <h1 className="text-2xl self-center pb-8">
        {monthNames[data.month - 1]}
      </h1>
      <div className="text-sm px-[10px] text-green-500">
        Overall income:{" "}
        <span className="text-base">
          {getCurrencyData(data.total, "income")}
        </span>
      </div>
      <div className="text-sm px-[10px] pt-2 text-red-500">
        Overall expenses:{" "}
        <span className="text-base">
          {getCurrencyData(data.total, "expenses")}
        </span>
      </div>

      <div className="px-[10px] pt-6">
        Total:{" "}
        <span className="text-green-500">
          {getCurrencyData(data.total, "totalMonth")}
        </span>
      </div>
    </div>
  );
});

export default Month;

// cssTotal(currencyData.total)
