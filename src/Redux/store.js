import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ThunkMiddleware from "redux-thunk";
import rootReducer from "./Reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(ThunkMiddleware));

function saveToLocalStorage(state) {
  console.log("SAVING STATE FROM REDUCERS TO LOCAL STORAGE");
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  console.log("LOADING STATE FROM LOCAL STORAGE");
  try {
    const serializedState = localStorage.getItem("persistantState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const store = legacy_createStore(
  rootReducer,
  loadFromLocalStorage(),
  composedEnhancer
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
