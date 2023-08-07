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
    <div className="flex flex-wrap gap-2 p-4 justify-start px-8">
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
  );
}

export default MobileMonthsContainer;
