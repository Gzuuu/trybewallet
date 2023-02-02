export const CURRENCY_TYPE = 'CURRENCY_TYPE';
export const CURRENCY_VALUE = 'CURRENCY_VALUE';
export const ACTUAL_EXPENSE = 'ACTUAL_EXPENSE';
const API = 'https://economia.awesomeapi.com.br/json/all';

export const currencyType = (payload) => ({
  type: CURRENCY_TYPE,
  payload,
});

export const currencyValue = (payload) => ({
  type: CURRENCY_VALUE,
  payload,
});

export const saveExpense = (payload, state) => ({
  type: ACTUAL_EXPENSE,
  payload,
  state,
});

export function fetchCurrencies(action) {
  return (dispatch) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => dispatch(action(data)));
  };
}

export function fetchValues(state) {
  return (dispatch) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => dispatch(saveExpense(data, state)));
  };
}
