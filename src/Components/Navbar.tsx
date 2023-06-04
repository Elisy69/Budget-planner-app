import React, { useEffect } from "react";
import { useGetRatesQuery } from "../api/currenciesApi";
import {
  changeCurrency,
  loadRates,
} from "../store/features/currencies/currenciesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "./Button";

function Navbar() {
  const { data } = useGetRatesQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.data) {
      dispatch(loadRates({ USD: data.data.USD, EUR: data.data.EUR }));
    }
  }, [data, dispatch]);
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  function nextCurrency() {
    dispatch(changeCurrency());
  }

  return (
    <nav className="flex w-full h-16 text-slate-50 text-xl text-center">
      <span className="pt-4">Current currency:</span>
      <span className="pt-3 text-3xl text-yellow-300 ml-0.5 mr-2">
        {currency}
      </span>
      <Button
        onSelect={() => {
          nextCurrency();
        }}
        title={"Change"}
        classNames="mt-4 h-8 px-2 mr-12"
      />
      <Button title={"Budget Analysis"} classNames="mr-4" />
      <Button title={"Budget Goals"} />
    </nav>
  );
}

export default Navbar;
