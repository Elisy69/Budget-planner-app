import { useEffect, useState } from "react";
import {
  addExpense,
  addIncome,
  calculateAccounts,
  calculateTotalRevenue,
} from "../store/features/budgets/monthsBudgetsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AddButton from "./ADDbutton";

interface FormProps {
  isIncome: Boolean;
}

function SubmitForm({ isIncome }: FormProps) {
  const [formAmount, setFormAmount] = useState("0");
  const incomeCategories = useAppSelector((state) => state.categories.income);
  const expensesCategories = useAppSelector(
    (state) => state.categories.expenses
  );
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const rate = useAppSelector((state) => state.currency.rate);

  useEffect(() => {
    setFormAmount("0");
  }, [month]);

  function calculateCurrencies(amount) {
    switch (currency) {
      case "₽": {
        return {
          RUB: amount,
          USD: amount * rate.USD,
          EUR: amount * rate.EUR,
        };
      }
      case "$": {
        return {
          RUB: amount * (1 / rate.USD),
          USD: amount,
          EUR: amount * (1 / rate.USD) * rate.EUR,
        };
      }
      case "€": {
        return {
          RUB: amount * (1 / rate.EUR),
          USD: amount * (1 / rate.EUR) * rate.USD,
          EUR: amount,
        };
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (month !== undefined) {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const calculated = calculateCurrencies(formJson.amount);

      isIncome
        ? dispatch(
            addIncome({
              month: month.month,
              RUBamount: Math.round(calculated.RUB),
              USDamount: Math.round(calculated.USD),
              EURamount: Math.round(calculated.EUR),
              category: formJson.category,
              commentary: formJson.commentary,
            })
          )
        : dispatch(
            addExpense({
              month: month.month,
              RUBamount: Math.round(calculated.RUB),
              USDamount: Math.round(calculated.USD),
              EURamount: Math.round(calculated.EUR),
              category: formJson.category,
              commentary: formJson.commentary,
            })
          );

      dispatch(
        calculateAccounts({
          month: month.month,
        })
      );
      dispatch(calculateTotalRevenue({ month: month.month }));
      setFormAmount("0");
    } else {
      console.log("select month");
    }
  }

  return (
    <form
      className="flex flex-col mt-4 w-full"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row border border-gray-600 rounded-md w-full">
        <input
          className="bg-transparent focus:outline-0 w-2/6 pl-5"
          name="amount"
          type="number"
          value={formAmount}
          onClick={(e) => {
            if (e.target.value === "0") setFormAmount("");
          }}
          onChange={(e) => {
            setFormAmount(e.target.value);
          }}
        />
        <select
          className="bg-transparent focus:outline-0 text-xs w-1/6"
          name="category"
        >
          {isIncome
            ? incomeCategories.map((category) => {
                return (
                  <option key={crypto.randomUUID()} value={`${category.title}`}>
                    {category.title}
                  </option>
                );
              })
            : expensesCategories.map((category) => {
                return (
                  <option key={crypto.randomUUID()} value={`${category.title}`}>
                    {category.title}
                  </option>
                );
              })}
        </select>
        <textarea
          className="textarea textarea-ghost focus:bg-transparent focus:outline-0 w-3/6 resize-y max-h-[3rem]"
          placeholder="Add commentary..."
          name="commentary"
        ></textarea>
      </div>
      <div className="flex flex-col items-center">
        <AddButton isIncome={isIncome} />
      </div>
    </form>
  );
}

export default SubmitForm;
