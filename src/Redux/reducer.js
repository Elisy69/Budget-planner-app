import { combineReducers } from "redux";

import monthsBudgetReducer from "./features/budgets/monthsBudgetsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

const rootReducer = combineReducers({
  monthsBudget: monthsBudgetReducer,
  categories: categoriesReducer,
});

export default rootReducer;
