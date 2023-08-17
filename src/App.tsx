import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import { useGetRatesQuery } from "./api/currenciesApi";
import BudgetAnalysis from "./pages/BudgetAnalysis";
import BudgetGoals from "./pages/BudgetGoals";
import BudgetPlanner from "./pages/BudgetPlanner";
import { loadRates } from "./store/features/currencies/currenciesSlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const { data } = useGetRatesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.data) {
      dispatch(loadRates({ USD: data.data.USD, EUR: data.data.EUR }));
    }
  }, [data, dispatch]);

  return (
    <div className="w-full flex flex-col font-mono overflow-scroll bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<BudgetPlanner />} />
        <Route path="/analysis" element={<BudgetAnalysis />} />
        <Route path="/goals" element={<BudgetGoals />} />
      </Routes>
    </div>
  );
}

export default App;
