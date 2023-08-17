import { nanoid } from "@reduxjs/toolkit";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateCurrencies } from "../../helpers/calculateCurrencies";
import { addGoalsGroup } from "../../store/features/budgetGoals/budgetGoalsSlice";
import { useAppSelector } from "../../store/hooks";
import GroupItem from "./GroupItem";

type GoalGroup = {
  id: string;
  title: string;
  amount: Total;
};

const ModalToAddBudgetGoalsGroup = forwardRef(
  function ModalToAddBudgetGoalsGroup(props, ref) {
    const currency = useAppSelector((state) => state.currency.currentCurrency);
    const rate = useAppSelector((state) => state.currency.rate);
    const [goalName, setGoalName] = useState("");
    const [goalAmount, setGoalAmount] = useState(0);
    const [newGoalsGroup, setNewGoalsGroup] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      setGoalName("");
      setGoalAmount(0);
    }, [newGoalsGroup]);

    function handleAddBudgetGoal(e) {
      e.preventDefault();
      if (goalName === "" || goalAmount === 0) return;
      const updatedGroup = [
        ...newGoalsGroup,
        {
          title: goalName,
          amount: calculateCurrencies(goalAmount, currency, rate),
        },
      ];
      setNewGoalsGroup(updatedGroup);
    }

    function handleTextInput() {
      return (e) => {
        setGoalName(e.target.value);
      };
    }

    function handleAmountInput() {
      return (e) => {
        setGoalAmount(Number(e.target.value));
      };
    }

    function handleAmountInputClick() {
      return () => {
        goalAmount === 0 ? setGoalAmount("") : "";
      };
    }
    function addBudgetGroupToStore() {
      return () => {
        dispatch(addGoalsGroup({ newGoalsGroup }));
        setNewGoalsGroup([]);
        setGoalName("");
        setGoalAmount(0);
      };
    }

    function handleModalClose() {
      return () => {
        setNewGoalsGroup([]);
        setGoalName("");
        setGoalAmount(0);
      };
    }

    return (
      <dialog id="my_modal_2" className="modal" ref={ref}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add new budget goals group</h3>
          <div className="w-full flex flex-col">
            <div className="flex flex-col w-full justify-between px-4 gap-2 mt-2">
              {newGoalsGroup.map((item: GoalGroup, index) => (
                <GroupItem
                  index={index}
                  title={item.title}
                  amount={item.amount}
                  key={nanoid()}
                />
              ))}
            </div>
            <div className="flex justify-between px-4 mt-4">
              <input
                className="w-2/5 placeholder:text-xs placeholder:px-1 text-xs px-1"
                placeholder="Budget goal..."
                type="text"
                value={goalName}
                onChange={handleTextInput()}
              />
              <span className="w-1/5 text-center">-</span>
              <input
                className="w-2/5 placeholder:text-xs placeholder:px-1 text-xs px-1"
                placeholder="Amount..."
                value={goalAmount}
                onClick={handleAmountInputClick()}
                type="number"
                onChange={handleAmountInput()}
              />
              <span className="pl-2 text-amber-300">{currency}</span>
            </div>
            <button
              onClick={handleAddBudgetGoal}
              className="bg-black rounded-lg w-12 h-8 hover:bg-gray-900 self-center mr-4 mt-4 active:bg-slate-800"
            >
              ADD
            </button>
          </div>
          <div className="modal-action">
            <button
              onClick={handleModalClose()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base"
            >
              ✕
            </button>
            <button
              onClick={addBudgetGroupToStore()}
              className="sm:w-20 sm:text-xs w-[69px] h-10 text-black text-[0.67rem] bg-blue-300 rounded-xl hover:bg-blue-400 active:bg-blue-100"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default ModalToAddBudgetGoalsGroup;
