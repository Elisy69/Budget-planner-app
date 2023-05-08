const initialState = {
  year: [
    {
      month: "April",
      income: [
        {
          amount: 250,
          category: initialState.categories.income[0],
          commentary: "First salary at a new job",
        },
        {
          amount: 1150,
          category: initialState.categories.income[4],
          commentary: "Bonus after contract termination",
        },
      ],
      expenses: [
        {
          amount: 650,
          category: initialState.categories.expenses[0],
          commentary: "",
        },
        {
          amount: 400,
          category: initialState.categories.income[1],
          commentary: "FOR TWO PEOPLE ONLY FOOD",
        },
      ],
      total: [],
    },
  ],
};

export default function monthsBudgetReducer(state = initialState, action) {
  switch (action.type) {
    case "addIncome": {
      return {
        ...state,
        year: [
          ...state.year,
          {
            income: action.amount,
            category: action.category,
            commentary: action.commentary,
          },
        ],
      };
    }
    default:
      return state;
  }
}
