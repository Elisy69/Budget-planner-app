type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

export function getTotalBasedOnCurrency(
  total: Total,
  currency: "₽" | "$" | "€"
) {
  switch (currency) {
    case "₽": {
      return Number(total.RUB.toFixed(2)).toLocaleString("en-US");
    }
    case "$": {
      return Number(total.USD.toFixed(2)).toLocaleString("en-US");
    }
    case "€": {
      return Number(total.EUR.toFixed(2)).toLocaleString("en-US");
    }
  }
}
