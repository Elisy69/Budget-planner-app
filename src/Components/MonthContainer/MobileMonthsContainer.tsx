import {
  select,
  unselect,
} from "../../store/features/budgets/monthsBudgetsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MobileMonth from "./MobileMonth";

function MobileMonthsContainer() {
  const months = useAppSelector((state) => state.budgets);
  const dispatch = useAppDispatch();

  function unselectMonth(monthIndex: number) {
    return () => {
      dispatch(unselect(monthIndex));
    };
  }
  function selectMonth(monthIndex: number) {
    return () => {
      dispatch(select(monthIndex));
    };
  }

  return (
    <div className="flex self-center items-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <div className="flex flex-wrap gap-2 sm:p-4 p-2 sm:px-8 lg:gap-4 self-center">
        {months.map((month, index) => {
          return (
            <MobileMonth
              onSelect={selectMonth(index)}
              unSelect={unselectMonth(index)}
              key={crypto.randomUUID()}
              data={month}
              isActive={month.active}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MobileMonthsContainer;
