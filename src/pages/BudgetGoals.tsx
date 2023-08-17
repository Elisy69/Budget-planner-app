import { nanoid } from "@reduxjs/toolkit";
import { useRef } from "react";
import BudgetGoalGroup from "../Components/BudgetGoals/BudgetGoalsGroup";
import ModalToAddBudgetGoalsGroup from "../Components/BudgetGoals/ModalToAddBudgetGoalsGroup";
import { useAppSelector } from "../store/hooks";

function BudgetGoals() {
  const goalsGroups = useAppSelector((state) => state.budgetGoals);
  const myModal = useRef<HTMLDialogElement>(null);

  function handleModal() {
    myModal.current?.showModal();
  }

  return (
    <div className="w-full h-content flex flex-col mb-10">
      <h1 className="text-center text-4xl mt-4">Budget Goals</h1>
      <div className="px-6 flex flex-col justify-center items-center w-full my-6">
        {goalsGroups.map((group, index) => (
          <BudgetGoalGroup
            items={group.items}
            id={group.id}
            key={nanoid()}
            index={index}
          />
        ))}
        <button
          onClick={handleModal}
          className="mt-2 peer self-center text-3xl rounded-full hover:bg-gray-100 hover:bg-opacity-30 hover:active:bg-opacity-80 active:bg-gray-50 w-10 h-10"
        >
          +
        </button>
        <div className="self-center w-[10rem] text-center text-sm peer-hover:text-white">
          Add new budget goals group
        </div>
        <ModalToAddBudgetGoalsGroup ref={myModal} />
      </div>
    </div>
  );
}

export default BudgetGoals;
