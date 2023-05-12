import { forwardRef } from "react";

const Month = forwardRef(function Month(
  { data, isActive, onSelect, unSelect },
  ref
) {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  const overallIncome = data.income.reduce((total, item) => {
    return total + Number(item.amount);
  }, 0);

  const overallExpenses = data.expenses.reduce((total, item) => {
    return total + Number(item.amount);
  }, 0);

  function getTotal(total) {
    if (total < 0) {
      return <span className="text-red-500">-{total}</span>;
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
      onClick={() => {
        onSelect();
        if (isActive === true) {
          unSelect();
        }
      }}
    >
      <h1 className="text-2xl self-center pb-8">{getMonthName(data.month)}</h1>
      <div className="text-sm px-[10px] text-green-500">
        Overall income: <span className="text-base">{overallIncome}</span>
      </div>
      <div className="text-sm px-[10px] pt-2 text-red-500">
        Overall expenses: <span className="text-base">{overallExpenses}</span>
      </div>

      <div className="px-[10px] pt-6">
        Total: <span className="text-green-500">{getTotal(data.total)}</span>
      </div>
    </div>
  );
});

export default Month;
