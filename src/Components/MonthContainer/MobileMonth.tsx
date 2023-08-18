import { getCategoryTotalBasedOnCurrency } from "../../helpers/getTotalBasedOnCurrency";
import { monthNames } from "../../helpers/months";
import { MonthType } from "../../store/features/budgets/monthsBudgetsSlice";
import { useAppSelector } from "../../store/hooks";
interface MonthProps {
  data: MonthType;
  isActive: Boolean;
  onSelect: () => void;
  unSelect: () => void;
}
function MobileMonth({ data, isActive, onSelect, unSelect }: MonthProps) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);

  const getColor = () => {
    const totalSum = data.total.totalMonth.RUB;
    if (totalSum === 0) return "badge-neutral-content";
    return totalSum > 0 ? "badge-success" : "badge-error";
  };

  return (
    <div
      onClick={isActive ? unSelect : onSelect}
      className={`${getColor()} ${
        isActive ? `` : `badge-outline`
      } badge cursor-pointer border-2 h-[1.5rem] md:h-[2rem] md:text-lg lg:h-[3rem] lg:text-xl lg:border-4 `}
    >
      {monthNames[data.month - 1]}:{" "}
      {getCategoryTotalBasedOnCurrency(data.total.totalMonth, currency)}
    </div>
  );
}

export default MobileMonth;
