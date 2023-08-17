export interface BudgetItem {
  RUBamount: number;
  USDamount: number;
  EURamount: number;
  categoryId: string;
  commentary: string;
}

export interface Total {
  RUB: number;
  USD: number;
  EUR: number;
}

export interface MonthType {
  month: number;
  income: BudgetItem[];
  expenses: BudgetItem[];
  active: Boolean;
  total:
    | number
    | {
        expenses: Total;
        income: Total;
      };
}
