import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import { useGetRatesQuery } from "./api/currenciesApi";
import BudgetAnalysis from "./pages/BudgetAnalysis";
import BudgetGoals from "./pages/BudgetGoals";
import BudgetPlanner from "./pages/BudgetPlanner";
import { loadMockDataGoals } from "./store/features/budgetGoals/budgetGoalsSlice";
import { loadMockDataBudgets } from "./store/features/budgets/monthsBudgetsSlice";
import { addMockCategories } from "./store/features/categories/categoriesSlice";
import { loadRates } from "./store/features/currencies/currenciesSlice";
import { switchMockDataLoaded } from "./store/features/mockData/mockDataSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const isMockDataLoaded = useAppSelector((state) => state.isMockDataLoaded);
  const { data } = useGetRatesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.data) {
      dispatch(loadRates({ USD: data.data.USD, EUR: data.data.EUR }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    isMockDataLoaded ? "" : dispatch(addMockCategories());
    dispatch(loadMockDataBudgets());
    dispatch(loadMockDataGoals());
  }, []);

  useEffect(() => {
    dispatch(switchMockDataLoaded());
  }, [isMockDataLoaded]);

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
