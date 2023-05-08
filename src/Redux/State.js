const budgetAppState = {
  year: [
    {
      month: "April",
      income: [
        {
          amount: 250,
          category: budgetAppState.categories.income[0],
          commentary: "First salary at a new job",
        },
        {
          amount: 1150,
          category: budgetAppState.categories.income[4],
          commentary: "Bonus after contract termination",
        },
      ],
      expenses: [
        {
          amount: 650,
          category: budgetAppState.categories.expenses[0],
          commentary: "",
        },
        {
          amount: 400,
          category: budgetAppState.categories.income[1],
          commentary: "FOR TWO PEOPLE ONLY FOOD",
        },
      ],
      total: [],
    },
  ],
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
