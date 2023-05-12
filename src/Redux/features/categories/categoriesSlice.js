const initialState = {
  income: ["salary", "help from parents", "initial funds", "selling", "other"],

  expenses: [
    "rent",
    "food",
    "tickets",
    "buying something",
    "medicine",
    "documents",
  ],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/addNewIncomeCategory": {
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    }
    default:
      return state;
  }
}
