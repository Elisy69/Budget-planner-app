import { default as BudgetSheet } from "../Components/BudgetPlanner/BudgetSheet";
import MobileMonthsContainer from "../Components/MonthContainer/MobileMonthsContainer";
import { useAppSelector } from "../store/hooks";

function BudgetPlanner() {
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );

  return (
    <div className="flex flex-col">
      <MobileMonthsContainer />
      {month ? (
        <div className="flex flex-col place-content-center px-4">
          <BudgetSheet isIncome={true} />
          <BudgetSheet isIncome={false} />
        </div>
      ) : (
        <div className="text-[5rem] text-center w-full mt-10">
          <div className="animate-bounce">👆</div>
          <div>Select Month!</div>
        </div>
      )}
    </div>
  );
}

export default BudgetPlanner;
