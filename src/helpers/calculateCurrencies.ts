type Rate = {
  USD: number;
  EUR: number;
};

type Currencies = "₽" | "$" | "€";

export function calculateCurrencies(
  amount: number,
  currency: Currencies,
  rate: Rate
) {
  switch (currency) {
    case "₽": {
      return {
        RUB: amount,
        USD: amount * rate.USD,
        EUR: amount * rate.EUR,
      };
    }
    case "$": {
      return {
        RUB: amount * (1 / rate.USD),
        USD: amount,
        EUR: amount * (1 / rate.USD) * rate.EUR,
      };
    }
    case "€": {
      return {
        RUB: amount * (1 / rate.EUR),
        USD: amount * (1 / rate.EUR) * rate.USD,
        EUR: amount,
      };
    }
  }
}
