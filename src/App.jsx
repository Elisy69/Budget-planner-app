import MonthsTray from "./Components/MonthsTray";

function App() {
  return (
    <div className="rounded-2xl self-center border border-slate-700 shadow-2xl drop-shadow-2xl w-[65rem] h-[45rem] flex font-mono">
      <MonthsTray />
      <div className="flex-col">
        <div className="h-20"></div>
        <div className="border-r border-gray-600 h-4/5"></div>
        <div className="h-16"></div>
      </div>
      <div className="w-3/4 flex-col pl-6 pr-2 py-2">
        <nav className="flex w-full h-16 text-slate-50 text-xl text-center">
          <span className="pt-4">Current currency:</span>
          <span className="pt-3 text-3xl text-yellow-300 ml-0.5 mr-2">$</span>
          <button className="bg-gray-700 rounded-lg mt-4 h-8 px-2 mr-12 hover:bg-gray-600 active:bg-gray-500">
            Change
          </button>
          <button className="bg-gray-700 rounded-lg mt-4 h-8 px-2 mr-4 hover:bg-gray-600 active:bg-gray-500">
            Budget Analysis
          </button>
          <button className="bg-gray-700 rounded-lg mt-4 h-8 px-2 hover:bg-gray-600 active:bg-gray-500">
            Budget Goals
          </button>
        </nav>
        <div className="w-full h-[39rem]">
          <div className="pt-8 w-full h-1/2 text-green-500">
            <h1 className="flex">
              <span className="text-3xl">Income</span>
              <button className="text-2xl ml-7 bg-green-950 rounded-lg w-14 h-8 hover:bg-green-800 leading-9 active:bg-green-700">
                ADD
              </button>
            </h1>
            <div className="border-b border-gray-600 w-4/5"></div>
            <nav className="flex text-gray-400 mb-2">
              <span className="w-6"></span>
              <span className="mr-14">Amount</span>
              <span className="mr-40">Category</span>
              <span>Commentary</span>
            </nav>
            <div className="flex">
              <span className="w-6">+</span>
              <span className="w-[7.1rem]">$ 250</span>
              <span className="w-[14.8rem]">Salary</span>
              <span>First salary at the new job</span>
            </div>
            <div className="flex">
              <span className="w-6">+</span>
              <span className="w-[7.1rem]">$ 1150</span>
              <span className="w-[14.8rem]">Bonus</span>
              <span>Bonus after contract termination</span>
            </div>
          </div>
          <div className="w-full h-1/2 text-red-500">
            <h1 className="flex">
              <span className="text-3xl">Expenses</span>
              <button className="text-2xl ml-7 bg-red-950 rounded-lg w-14 h-8 hover:bg-red-800 leading-9 active:bg-red-700">
                ADD
              </button>
            </h1>
            <div className="border-b border-gray-600 w-4/5"></div>
            <nav className="flex text-gray-400 mb-2">
              <span className="w-6"></span>
              <span className="mr-14">Amount</span>
              <span className="mr-40">Category</span>
              <span>Commentary</span>
            </nav>
            <div className="flex">
              <span className="w-6">-</span>
              <span className="w-[7.1rem]">$ 650</span>
              <span className="w-[14.8rem]">Rent</span>
              <span></span>
            </div>
            <div className="flex">
              <span className="w-6">-</span>
              <span className="w-[7.1rem]">$ 400</span>
              <span className="w-[14.8rem]">Food</span>
              <span>For two people ONLY FOOD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
