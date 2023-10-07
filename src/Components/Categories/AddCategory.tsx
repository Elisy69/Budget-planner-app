import { useState } from "react";
import {
  addNewExpensesCategory,
  addNewIncomeCategory,
} from "../../store/features/categories/categoriesSlice";
import { useAppDispatch } from "../../store/hooks";

interface AddCategpryFormProps {
  isIncome: boolean;
}

function AddCategpryForm({ isIncome }: AddCategpryFormProps) {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useAppDispatch();

  function handleAddCategory(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    isIncome
      ? dispatch(addNewIncomeCategory(newCategory))
      : dispatch(addNewExpensesCategory(newCategory));
    setNewCategory("");
  }
  return (
    <div className="flex flex-col w-3/4">
      <input
        value={newCategory}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
        type="text"
        className="w-full self-center focus:outline-0 pl-1"
      />
      <button
        onClick={handleAddCategory}
        className=" w-7 h-7 self-center rounded-full  leading-4 mt-2 text-[1.5rem] hover:bg-slate-500 active:bg-white"
      >
        +
      </button>
    </div>
  );
}

export default AddCategpryForm;
