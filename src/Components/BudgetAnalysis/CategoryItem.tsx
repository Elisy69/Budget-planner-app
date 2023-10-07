import { getCategoryNameById } from "../../helpers/getCategoryNameById";
import { getTotalBasedOnCurrency } from "../../helpers/getTotalBasedOnCurrency";
import { useAppSelector } from "../../store/hooks";

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

interface CategoryItemProps {
  total: Total;
  id: string;
  share?: number;
  isIncome: boolean;
}

function CategoryItem({ total, id, share, isIncome }: CategoryItemProps) {
  const currency = useAppSelector((state) => state.currency.currentCurrency);

  return (
    <div className="relative">
      <div
        className={`${isIncome ? `text-green-400` : `text-red-400`} flex gap-2`}
      >
        <h1 className="first-letter:uppercase text-xl mb-1 font-bold  leading-5">
          {getCategoryNameById(id, isIncome)}
        </h1>{" "}
        - <h1 className="font-bold">{share}%</h1>
      </div>
      <progress
        className={`${
          isIncome ? `progress-success` : `progress-error`
        } progress h-6 w-full`}
        value={share}
        max="100"
      ></progress>
      <h2 className="pl-2">
        {currency} {getTotalBasedOnCurrency(total, currency)}
      </h2>
    </div>
  );
}

export default CategoryItem;
