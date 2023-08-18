import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoryTotalBasedOnCurrency } from "../../helpers/getTotalBasedOnCurrency";
import { updateNetIncome } from "../../store/features/categories/categoriesSlice";
import { useAppSelector } from "../../store/hooks";

function NetIncome() {
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const months = useAppSelector((state) => state.budgets);
  const netIncomeData = useAppSelector((state) => state.categories.netIncome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNetIncome({
        months,
      })
    );
  }, [months]);

  return (
    <div className="px-6 flex flex-col items-center justify-center w-full my-6 gap-4">
      <h1 className="text-3xl text-center">Net income per month: </h1>
      <div
        className={`text-2xl ${
          netIncomeData.RUB <= 0 ? `text-red-500` : `text-green-500`
        }`}
      >
        {currency} {getCategoryTotalBasedOnCurrency(netIncomeData, currency)}
      </div>
    </div>
  );
}

export default NetIncome;
