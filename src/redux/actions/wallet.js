export const CURRENCY_TYPE = 'CURRENCY_TYPE';
export const CURRENCY_VALUE = 'CURRENCY_VALUE';
export const ACTUAL_EXPENSE = 'ACTUAL_EXPENSE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const REMOVE_FROM_STATE = 'REMOVE_FROM_STATE';
const API = 'https://economia.awesomeapi.com.br/json/all';

export const currencyType = (payload) => ({
  type: CURRENCY_TYPE,
  payload,
});

export const editItem = (payload = {}) => ({
  type: EDIT_ITEM,
  payload,
});

export const removeState = (data, payload) => ({
  type: REMOVE_FROM_STATE,
  data,
  payload,
});

export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
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

export function fetchCurrencies(action, payload = {}) {
  return (dispatch) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => dispatch(action(data, payload)));
  };
}

export function fetchValues(state) {
  return (dispatch) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => dispatch(saveExpense(data, state)));
  };
}
