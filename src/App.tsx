import { useEffect, useState } from "react";
import {
  default as BudgetSheet,
  default as Income,
} from "./Components/BudgetSheet";
import DesktopMonthsContainer from "./Components/MonthContainer/DesktopMonthsContainer";
import MobileMonthsContainer from "./Components/MonthContainer/MobileMonthsContainer";
import Navbar from "./Components/Navbar";
import { useAppSelector } from "./store/hooks";

const verticalLine = (
  <div className="flex-col">
    <div className="h-20"></div>
    <div className="border-r border-gray-600 h-4/5"></div>
    <div className="h-16"></div>
  </div>
);

function App() {
  const [isMobile, setIsMobile] = useState<Boolean>(window.innerWidth < 768);
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  const month = useAppSelector((state) =>
    state.budgets.find((month) => month.active === true)
  );

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  });

  return (
    <div className="w-full flex flex-col font-mono overflow-scroll bg-black">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {isMobile ? <MobileMonthsContainer /> : <DesktopMonthsContainer />}
        {month ? (
          <div className="flex flex-col place-content-center px-4">
            <BudgetSheet isIncome={true} />
            <BudgetSheet isIncome={false} />
          </div>
        ) : (
          <div className="text-[5rem] text-center w-full mt-10">
            <div className="animate-bounce">👆</div>
            <div>Select Month!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
