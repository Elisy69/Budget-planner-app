import { useEffect, useState } from "react";
import { calculateCurrencies } from "../../helpers/calculateCurrencies";
import { getDecimalFixedNumber } from "../../helpers/toFixed";
import {
  addExpense,
  addIncome,
  calculateAccounts,
  calculateTotalRevenue,
} from "../../store/features/budgets/monthsBudgetsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AddButton from "./ADDbutton";

interface FormProps {
  isIncome: Boolean;
}

function getCategoryIdByName(categoryName, categoryData) {
  const categoryObj = categoryData.find((item) => categoryName === item.title);
  return categoryObj?.id;
}

function SubmitForm({ isIncome }: FormProps) {
  const [formAmount, setFormAmount] = useState("0");
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const rate = useAppSelector((state) => state.currency.rate);
  const incomeCategories = useAppSelector((state) => state.categories.income);
  const expensesCategories = useAppSelector(
    (state) => state.categories.expenses
  );
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormAmount("0");
  }, [month]);

  function handleSubmit(e) {
    e.preventDefault();
    if (month !== undefined) {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const calculated = calculateCurrencies(formJson.amount, currency, rate);
      isIncome
        ? dispatch(
            addIncome({
              month: month.month,
              RUBamount: getDecimalFixedNumber(calculated.RUB),
              USDamount: getDecimalFixedNumber(calculated.USD),
              EURamount: getDecimalFixedNumber(calculated.EUR),
              categoryId: getCategoryIdByName(
                formJson.category,
                incomeCategories
              ),
              commentary: formJson.commentary,
            })
          )
        : dispatch(
            addExpense({
              month: month.month,
              RUBamount: getDecimalFixedNumber(calculated.RUB),
              USDamount: getDecimalFixedNumber(calculated.USD),
              EURamount: getDecimalFixedNumber(calculated.EUR),
              categoryId: getCategoryIdByName(
                formJson.category,
                expensesCategories
              ),
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
          className="bg-transparent focus:outline-0 w-5/12 pl-5"
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
          className="bg-transparent focus:outline-0 text-xs w-3/12"
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
          className="textarea text-xs lg:text-base textarea-ghost focus:bg-transparent focus:outline-0 w-4/12 resize-y max-h-[3rem]"
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
