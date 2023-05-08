import { useRef, useState } from "react";
import Month from "./Month";

const testArr = [
  { text: 1, active: false },
  { text: 2, active: false },
  { text: 3, active: false },
  { text: 4, active: false },
  { text: 5, active: false },
  { text: 6, active: false },
  { text: 7, active: false },
  { text: 8, active: false },
  { text: 9, active: false },
  { text: 10, active: false },
  { text: 11, active: false },
  { text: 12, active: false },
];

function MonthsTray() {
  const monthRef = useRef(null);
  const [testData, setTestData] = useState(testArr);

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
    const updatedArray = testData.map((item) => {
      if (item.text === month) {
        item.active = true;
      } else item.active = false;
      return item;
    });
    console.log(updatedArray);
    setTestData(updatedArray);
  }

  return (
    <div className="pt-56 pb-56 h-full w-1/4 text-white overflow-scroll bg-gradient-to-r from-black/20 to-stone-900/50">
      {testData.map((item) => {
        return (
          <Month
            onSelect={() => {
              scrollToId(testArr.indexOf(item) + 1);
              selectMonth(testArr.indexOf(item) + 1);
            }}
            key={crypto.randomUUID()}
            text={item.text}
            isActive={item.active}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(testArr.indexOf(item) + 1, node);
              } else {
                map.delete(testArr.indexOf(item) + 1);
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default MonthsTray;
