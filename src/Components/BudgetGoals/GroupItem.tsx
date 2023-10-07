import { getTotalBasedOnCurrency } from "../../helpers/getTotalBasedOnCurrency";
import { useAppSelector } from "../../store/hooks";

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

interface GroupItemProps {
  title: string;
  amount: Total;
  index?: number;
}

function GroupItem({ title, amount, index }: GroupItemProps) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);

  return (
    <div className="flex sm:text-xl text-md">
      {index || index === 0 ? <div>{index + 1}. </div> : ""}
      <div
        className={`${
          index || index === 0 ? `w-[40%]` : `w-7/12`
        } pl-2 font-bold text-gray-300 w-7/12`}
      >
        {title}
      </div>
      <div
        className={`${
          index || index === 0 ? `w-[1.5rem]` : `w-1/12`
        } text-center`}
      >
        -
      </div>
      <div
        className={`${
          index || index === 0 ? `w-[50%]` : `w-4/12`
        } flex gap-2 justify-center`}
      >
        <span className="text-amber-400">{currency}</span>
        <span className="text-gray-200">
          {getTotalBasedOnCurrency(amount, currency)}
        </span>
      </div>
    </div>
  );
}

export default GroupItem;
