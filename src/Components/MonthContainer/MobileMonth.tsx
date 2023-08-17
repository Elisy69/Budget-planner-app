import { monthNames } from "../../helpers/months";
import { useAppSelector } from "../../store/hooks";
import { MonthType } from "../../types/types";

interface MonthProps {
  data: MonthType;
  isActive: Boolean;
  onSelect: () => void;
  unSelect: () => void;
}

const currencies = {
  "₽": "RUB",
  "$": "USD",
  "€": "EUR",
};

function MobileMonth({ data, isActive, onSelect, unSelect }: MonthProps) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  function getCurrencyData(data, budgetCategory) {
    if (typeof data !== "number") {
      return data[budgetCategory][currencies[currency]];
    } else {
      return 0;
    }
  }

  const getColor = (total) => {
    const totalSum = total.totalMonth?.[currencies[currency]] ?? 0;
    if (totalSum === 0) return "badge-neutral-content";
    return totalSum > 0 ? "badge-success" : "badge-error";
  };

  return (
    <div
      onClick={isActive ? unSelect : onSelect}
      className={`${getColor(data.total)} ${
        isActive ? `` : `badge-outline`
      } badge cursor-pointer border-2 h-[1.5rem] md:h-[2rem] md:text-lg lg:h-[3rem] lg:text-xl lg:border-4 `}
    >
      {monthNames[data.month - 1]}: {getCurrencyData(data.total, "totalMonth")}
    </div>
  );
}

export default MobileMonth;
