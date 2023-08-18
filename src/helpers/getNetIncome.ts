import { MonthType } from "../store/features/budgets/monthsBudgetsSlice";
import { Currencies } from "../store/features/currencies/currenciesSlice";

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

type TotalKeys = keyof Total;

function getAccountedMonths(months: MonthType[]) {
  let [monthsWithIncome, monthsWithExpenses] = [0, 0];
  months.forEach((month) => {
    month.income.length !== 0 ? monthsWithIncome++ : "";
    month.expenses.length !== 0 ? monthsWithExpenses++ : "";
  });
  return Math.max(monthsWithExpenses, monthsWithIncome);
}

function getTotalNetIncome(months: MonthType[]) {
  return months.reduce(
    (total: Total, currentObj: MonthType) => {
      return {
        ...total,
        RUB: total.RUB + Number(currentObj.total.totalMonth.RUB),
        USD: total.USD + Number(currentObj.total.totalMonth.USD),
        EUR: total.EUR + Number(currentObj.total.totalMonth.EUR),
      };
    },
    { RUB: 0, USD: 0, EUR: 0 }
  );
}

function getMonthlyNetIncome(totalNetIncome: Total, accountedMonths: number) {
  if (accountedMonths === 0) return { RUB: 0, EUR: 0, USD: 0 };
  const monthlyNetIncome = { ...totalNetIncome };
  for (let currency in monthlyNetIncome) {
    const typedCurrency = currency as TotalKeys;
    monthlyNetIncome[typedCurrency] = Number(
      monthlyNetIncome[typedCurrency] / accountedMonths
    );
  }
  return monthlyNetIncome;
}

export function getNetIncome(months: MonthType[]) {
  const accountedMonths = getAccountedMonths(months);
  const totalNetIncome = getTotalNetIncome(months);
  return getMonthlyNetIncome(totalNetIncome, accountedMonths);
}
