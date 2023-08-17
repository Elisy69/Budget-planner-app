import { createSlice, nanoid } from "@reduxjs/toolkit";

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

type Goal = {
  title: string;
  amount: Total;
};

interface GoalGroup {
  id: string;
  items: Goal[];
}

const initialState: GoalGroup[] = [];

const budgetGoalsSlice = createSlice({
  name: "budgetGoals",
  initialState: initialState,
  reducers: {
    addGoalsGroup(state, action) {
      const updState = [...state];
      updState.push({ id: nanoid(), items: action.payload.newGoalsGroup });
      return updState;
    },
    removeGoalGroup(state, action) {
      const updState = [...state].filter(
        (group) => group.id !== action.payload.id
      );
      return updState;
    },
  },
});

export const { addGoalsGroup, removeGoalGroup } = budgetGoalsSlice.actions;

export default budgetGoalsSlice.reducer;
