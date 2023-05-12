const initialState = {
  currentCurrency: "₽",
  rate: { USD: 0, EUR: 0 },
};

function nextCurrency(currentCurrency) {
  if (currentCurrency === "₽") {
    return "$";
  } else if (currentCurrency === "$") {
    return "€";
  } else if (currentCurrency === "€") {
    return "₽";
  }
}

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case "loadRates": {
      return {
        ...state,
        rate: {
          ...state.rate,
          USD: action.payload.USD,
          EUR: action.payload.EUR,
        },
      };
    }
    case "changeCurrency": {
      return {
        ...state,
        currentCurrency: nextCurrency(state.currentCurrency),
      };
    }
    default:
      return state;
  }
}

export async function fetchRates(dispatch, getState) {
  const response = await fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=Ll0rKV34xAuhEugC7oxi5xlKiRFzmplW8GdYnOof&currencies=USD%2CEUR&base_currency=RUB"
  );
  const data = await response.json();

  dispatch({
    type: "loadRates",
    payload: { USD: data.data.USD, EUR: data.data.EUR },
  });
}
