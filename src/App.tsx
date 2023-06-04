import React from "react";
import Expenses from "./Components/Expenses";
import Income from "./Components/Income";
import MonthsTray from "./Components/MonthsTray";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="realative rounded-2xl self-center border border-slate-700 shadow-2xl drop-shadow-2xl flex font-mono lg:max-w-[65rem] lg:max-h-[45rem]">
      <MonthsTray />
      <div className="flex-col">
        <div className="h-20"></div>
        <div className="border-r border-gray-600 h-4/5"></div>
        <div className="h-16"></div>
      </div>
      <div className="w-3/4 flex-col pl-6 pr-2 py-2">
        <Navbar />
        <div className="w-full h-[39rem]">
          <Income />
          <Expenses />
        </div>
      </div>
    </div>
  );
}

export default App;
