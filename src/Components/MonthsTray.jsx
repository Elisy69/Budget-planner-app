import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Month from "./Month";

function MonthsTray() {
  const monthRef = useRef(null);
  const months = useSelector((state) => state.monthsBudget);
  const dispatch = useDispatch();

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function getMap() {
    if (!monthRef.current) {
      monthRef.current = new Map();
    }
    return monthRef.current;
  }

  function selectMonth(month) {
    dispatch({ type: "select", payload: { month: month } });
  }
  function unselectMonth(month) {
    dispatch({ type: "unselect", payload: { month: month } });
  }

  return (
    <div className="pt-56 pb-48 h-full w-1/4 text-white overflow-scroll bg-gradient-to-r from-black/20 to-stone-900/50">
      {months.map((month) => {
        return (
          <Month
            onSelect={() => {
              scrollToId(months.indexOf(month) + 1);
              selectMonth(month.month);
            }}
            unSelect={() => {
              unselectMonth(month.month);
            }}
            key={crypto.randomUUID()}
            data={month}
            isActive={month.active}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(months.indexOf(month) + 1, node);
              } else {
                map.delete(months.indexOf(month) + 1);
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default MonthsTray;
