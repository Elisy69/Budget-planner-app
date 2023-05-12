import store from "../../store";
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function getMonths() {
  return months.reduce((acc, currentValue) => {
    return [
      ...acc,
      {
        month: currentValue,
        income: [],
        expenses: [],
        active: false,
        total: 0,
      },
    ];
  }, []);
}

const initialState = getMonths();

//  НАПИСАТЬ ДИСПАТЧ КОТОРЫЙ СЧИТАЕТ ТОТАЛ (ОТДЕЛЬНЫЙ ДИСПАТЧ)
export default function monthsBudgetReducer(state = initialState, action) {
  switch (action.type) {
    case "addIncome": {
      console.log(`adding value in ${currency} currency`);
      const monthIndex = action.payload.month - 1;
      const updatedMonth = {
        ...state[monthIndex],
        income: [
          ...state[monthIndex].income,
          {
            amount: action.payload.amount,
            category: action.payload.category,
            commentary: action.payload.commentary,
          },
        ],
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    }
    case "addExpense": {
      const monthIndex = action.payload.month - 1;
      const updatedMonth = {
        ...state[monthIndex],
        expenses: [
          ...state[monthIndex].expenses,
          {
            amount: action.payload.amount,
            category: action.payload.category,
            commentary: action.payload.commentary,
          },
        ],
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    }
    case "calculateTotal": {
      const monthIndex = action.payload.month - 1;
      const monthIncome = state[monthIndex].income;
      const monthExpenses = state[monthIndex].expenses;
      const overallIncome = monthIncome.reduce((total, item) => {
        return total + Number(item.amount);
      }, 0);
      const overallExpenses = monthExpenses.reduce((total, item) => {
        return total + Number(item.amount);
      }, 0);
      const updatedMonth = {
        ...state[monthIndex],
        total: overallIncome - overallExpenses,
      };
      const updatedState = [...state];
      updatedState[monthIndex] = updatedMonth;
      return updatedState;
    }
    case "select": {
      const monthIndex = action.payload.month - 1;
      const updatedState = state.map((month, index) => {
        if (index === monthIndex) {
          return {
            ...month,
            active: true,
          };
        } else return { ...month, active: false };
      });

      return updatedState;
    }
    case "unselect": {
      const monthIndex = action.payload.month - 1;
      const updatedState = state.map((month, index) => {
        if (index === monthIndex) {
          return {
            ...month,
            active: false,
          };
        } else return { ...month, active: false };
      });

      return updatedState;
    }
    default:
      return state;
  }
}
