import { useDispatch } from "react-redux";
import {
  calculateAccounts,
  calculateTotalRevenue,
  removeBudgetItemsBasedOnCategory,
} from "../../store/features/budgets/monthsBudgetsSlice";
import { deleteCategory } from "../../store/features/categories/categoriesSlice";

interface Item {
  title: string;
  id: string;
}

interface CategoriesListPorps {
  item: Item;
  onChange: (value: string, item: Item) => void;
  isIncome: boolean;
}

function CategoriesList({ item, onChange, isIncome }: CategoriesListPorps) {
  const dispatch = useDispatch();

  function handleChangle(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value, item);
  }

  function deleteItem() {
    dispatch(deleteCategory({ isIncome: isIncome, id: item.id }));
    dispatch(
      removeBudgetItemsBasedOnCategory({ isIncome: isIncome, id: item.id })
    );
    // not quite efficient, need to add condition (which months changed based on category) for recalculation
    for (let i = 1; i <= 12; i++) {
      dispatch(calculateAccounts({ month: i }));
      dispatch(calculateTotalRevenue({ month: i }));
    }
  }

  return (
    <div className="flex flex-col  relative">
      <input
        className="bg-transparent focus:outline-0 w-full pl-4 peer"
        type="text"
        value={item.title}
        onChange={handleChangle}
      />
      <div
        onClick={deleteItem}
        className="cursor-pointer opacity-40 hover:opacity-100 absolute block rounded-full border hover:bg-red-400 border-red-900 bg-red-700 text-white top-[20%] left-[-1%] w-4 h-4 leading-3 text-xs"
      >
        ✖
      </div>
    </div>
  );
}

export default CategoriesList;
