import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "../api/currenciesApi";

import budgetGoalsReducer from "./features/budgetGoals/budgetGoalsSlice";
import monthsBudgetReducer from "./features/budgets/monthsBudgetsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import currencyReducer from "./features/currencies/currenciesSlice";

const rootReducer = combineReducers({
  budgets: monthsBudgetReducer,
  categories: categoriesReducer,
  currency: currencyReducer,
  budgetGoals: budgetGoalsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
