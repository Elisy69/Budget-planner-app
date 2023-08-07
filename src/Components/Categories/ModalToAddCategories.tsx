import { useDispatch } from "react-redux";
import {
  onChangeExpensesCategories,
  onChangeIncomeCategories,
} from "../../store/features/categories/categoriesSlice";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button";
import AddCategory from "./AddCategory";
import CategoriesList from "./CategoriesList";

interface Item {
  title: string;
  id: string;
}

function ModalToAddCategories() {
  const incomeCategories = useAppSelector((state) => state.categories.income);
  const expensesCategories = useAppSelector(
    (state) => state.categories.expenses
  );

  const dispatch = useDispatch();

  function handleCategoryChange(isIncome: boolean) {
    return (value: string, item: Item) => {
      isIncome
        ? dispatch(
            onChangeIncomeCategories({
              title: value,
              id: item.id,
            })
          )
        : dispatch(
            onChangeExpensesCategories({
              title: value,
              id: item.id,
            })
          );
    };
  }

  function renderCategoryItems(category: Item[], isIncome: boolean) {
    return (
      <ul
        className={`flex w-1/2 flex-col gap-1 mt-2 ${
          isIncome ? `text-green-300` : `text-red-300`
        }`}
      >
        {category.map((item) => (
          <CategoriesList
            key={item.id}
            item={item}
            onChange={handleCategoryChange(isIncome)}
            isIncome={isIncome}
          />
        ))}
        <AddCategory isIncome={isIncome} />
      </ul>
    );
  }
  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Add or remove Categories</h3>
        <div className="flex flex-col w-full">
          <div className="flex w-full text-lg mt-2 font-bold">
            <h1 className="w-1/2 text-start text-green-500">Income:</h1>
            <h1 className="w-1/2 text-start text-red-500">Expenses:</h1>
          </div>
          <div className="flex w-full">
            {renderCategoryItems(incomeCategories, true)}
            {renderCategoryItems(expensesCategories, false)}
          </div>
        </div>
        <div className="modal-action">
          <Button title={"Close"} />
        </div>
      </form>
    </dialog>
  );
}

export default ModalToAddCategories;
