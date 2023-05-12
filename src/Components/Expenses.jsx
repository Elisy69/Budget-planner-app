import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// и еще функция для смены валюты с проверкой курса онлайн

function Expenses() {
  const [formAmount, setFormAmount] = useState(0);
  const categories = useSelector((state) => state.categories.expenses);
  const month = useSelector((state) =>
    state.monthsBudget.find((month) => month.active === true)
  );
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currencies.currentCurrency);

  function handleSubmit(e) {
    e.preventDefault();
    if (month !== undefined) {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      dispatch({
        type: "addExpense",
        payload: {
          month: month.month,
          amount: formJson.amount,
          category: formJson.category,
          commentary: formJson.commentary,
        },
      });
      dispatch({ type: "calculateTotal", payload: { month: month.month } });
    } else {
      console.log("select month");
    }
  }

  function renderExpenses(month) {
    if (month !== undefined) {
      return month.expenses.map((expenses) => {
        return (
          <div key={crypto.randomUUID()} className="flex">
            <span className="w-6">-</span>
            <span className="w-[7.1rem]">
              {currency} {expenses.amount}
            </span>
            <span className="w-[14.8rem]">{expenses.category}</span>
            <span>{expenses.commentary}</span>
          </div>
        );
      });
    } else {
      console.log("wainting for month to be selected...");
    }
  }

  return (
    <div className="w-full h-1/2 text-red-500">
      <h1 className="flex">
        <span className="text-3xl">Expenses</span>
      </h1>
      <div className="border-b border-gray-600 w-4/5"></div>
      <nav className="flex text-gray-400 mb-2">
        <span className="w-6"></span>
        <span className="mr-14">Amount</span>
        <span className="mr-40">Category</span>
        <span>Commentary</span>
      </nav>
      {renderExpenses(month)}
      <form
        className="flex flex-col pt-4 "
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row border border-gray-600 rounded-md ml-6 mr-[9rem]">
          <input
            className=" bg-transparent focus:outline-0 w-[6.8rem] pl-5"
            name="amount"
            type="text"
            value={formAmount}
            onChange={(e) => {
              setFormAmount(e.target.value);
            }}
          />
          <select
            className="w-32 bg-transparent focus:outline-0 mr-[7rem] text-xs"
            name="category"
          >
            {categories.map((category) => {
              return (
                <option key={crypto.randomUUID()} value={`${category}`}>
                  {category}
                </option>
              );
            })}
          </select>
          <textarea
            className="bg-transparent focus:outline-0 "
            name="commentary"
            cols="22"
            rows="1"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <button
            type="submut"
            className="self-center mr-32 mt-4 text-2xl bg-red-950 rounded-lg w-14 h-8 hover:bg-red-800 leading-9 active:bg-red-700"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default Expenses;
