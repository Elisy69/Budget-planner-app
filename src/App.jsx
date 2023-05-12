import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Components/Button";
import Expenses from "./Components/Expenses";
import Income from "./Components/Income";
import { fetchRates } from "./Redux/features/currencies/currenciesSlice";

import MonthsTray from "./Components/MonthsTray";

import store from "./Redux/store";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRates);
  }, []);
  const currency = useSelector((state) => state.currencies.currentCurrency);
  function changeCurrency() {
    dispatch({ type: "changeCurrency" });
  }
  const rate = useSelector((state) => state.currencies.rate);

  function calculateRate(amount, currentCurrency) {
    switch (currentCurrency) {
      case "₽": {
        return amount / rate.EUR;
      }
      case "$": {
        return amount * rate.USD;
      }
      case "€": {
        return (amount / rate.USD) * rate.EUR;
      }
    }
  }

  return (
    <div className="realative rounded-2xl self-center border border-slate-700 shadow-2xl drop-shadow-2xl w-[65rem] h-[45rem] flex font-mono">
      <MonthsTray />
      <div className="flex-col">
        <div className="h-20"></div>
        <div className="border-r border-gray-600 h-4/5"></div>
        <div className="h-16"></div>
      </div>
      <div className="w-3/4 flex-col pl-6 pr-2 py-2">
        <nav className="flex w-full h-16 text-slate-50 text-xl text-center">
          <span className="pt-4">Current currency:</span>
          <span className="pt-3 text-3xl text-yellow-300 ml-0.5 mr-2">
            {currency}
          </span>
          <Button
            onSelect={() => {
              changeCurrency();
            }}
            title={"Change"}
            classNames="mt-4 h-8 px-2 mr-12"
          />
          <Button title={"Budget Analysis"} classNames="mr-4" />
          <Button title={"Budget Goals"} />
        </nav>
        <div className="w-full h-[39rem]">
          <Income calculateRate={calculateRate} />
          <Expenses />
        </div>
      </div>
    </div>
  );
}

export default App;
