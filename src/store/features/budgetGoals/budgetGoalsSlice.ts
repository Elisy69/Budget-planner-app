import { createSlice, nanoid } from "@reduxjs/toolkit";
import { MOCK_DATA } from "../../../constants/MOCK_DATA";

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
    loadMockDataGoals() {
      return JSON.parse(MOCK_DATA.GOALS);
    },
  },
});

export const { addGoalsGroup, removeGoalGroup, loadMockDataGoals } =
  budgetGoalsSlice.actions;

export default budgetGoalsSlice.reducer;
