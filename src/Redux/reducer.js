import { combineReducers } from "redux";

import monthsBudgetReducer from "./features/budgets/monthsBudgetsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import currencyReducer from "./features/currencies/currenciesSlice";

const rootReducer = combineReducers({
  monthsBudget: monthsBudgetReducer,
  categories: categoriesReducer,
  currencies: currencyReducer,
});

export default rootReducer;
