import React, { useRef } from "react";
import {
  select,
  unselect,
} from "../../store/features/budgets/monthsBudgetsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DesktopMonth from "./DesktopMonth";

type ForScrolling = Map<number, HTMLElement> | null;

function MonthsTray() {
  const monthRef = useRef<ForScrolling>(null);
  const months = useAppSelector((state) => state.budgets);
  const dispatch = useAppDispatch();

  function scrollToId(itemId: number) {
    const map = getMap();
    const node = map!.get(itemId + 1);
    node!.scrollIntoView({
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

  function unselectMonth(monthIndex: number) {
    return () => {
      dispatch(unselect(monthIndex));
    };
  }
  function selectMonth(monthIndex: number) {
    return () => {
      scrollToId(monthIndex);
      dispatch(select(monthIndex));
    };
  }

  //написать функцию которая запускается на выборе

  return (
    <div className="pt-56 pb-32 max-h-full w-1/4 text-white bg-gradient-to-r from-black/20 to-stone-900/50 overflow-y-scroll ">
      {months.map((month, index) => {
        return (
          <DesktopMonth
            onSelect={selectMonth(index)}
            unSelect={unselectMonth(index)}
            key={crypto.randomUUID()}
            data={month}
            isActive={month.active}
            ref={(node: HTMLElement) => {
              const map = getMap();
              if (node) {
                map.set(index + 1, node);
              } else {
                map.delete(index + 1);
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default MonthsTray;
