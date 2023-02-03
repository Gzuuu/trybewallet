// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCY_VALUE,
  CURRENCY_TYPE,
  ACTUAL_EXPENSE,
  DELETE_ITEM } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_TYPE:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  case CURRENCY_VALUE:
    return {
      ...state,
      actualValues: action.payload,
    };
  case ACTUAL_EXPENSE:
    delete action.payload.USDT;
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.state,
        exchangeRates: action.payload,
      }],
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: [...state.expenses]
        .filter((expense) => expense.id !== Number(action.payload)),
    };
  default:
    return state;
  }
};

export default walletReducer;
