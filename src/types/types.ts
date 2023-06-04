interface BudgetItems {
  RUBamount: number;
  USDamount: number;
  EURamount: number;
  category: string;
  commentary: string;
}

interface Total {
  RUB: number;
  USD: number;
  EUR: number;
}

export interface MonthType {
  month: number;
  income: BudgetItems[];
  expenses: BudgetItems[];
  active: Boolean;
  total:
    | number
    | {
        expenses: Total;
        income: Total;
      };
}
