const initialState = {
  categories: [
    {
      income: [
        "salary",
        "help from parents",
        "initial funds",
        "selling",
        "other",
      ],
    },
    {
      expenses: [
        "rent",
        "food",
        "tickets",
        "buying somethinh",
        "medicine",
        "documents",
      ],
    },
  ],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/addNewIncomeCategory": {
      return {
        ...state,
        categories: [
          ...state.categories,
          { income: [...state.categories.income, action.payload] },
        ],
      };
    }
    default:
      return state;
  }
}
