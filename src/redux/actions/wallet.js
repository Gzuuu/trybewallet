export const CURRENCY_VALUE = 'CURRENCY_VALUE';
const API = 'https://economia.awesomeapi.com.br/json/all';

export const currencyValue = (payload) => ({
  type: CURRENCY_VALUE,
  payload,
});

export function fetchCurrencies() {
  return (dispatch) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => dispatch(currencyValue(data)));
  };
}
