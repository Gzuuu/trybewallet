// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_VALUE } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_VALUE:
    return {
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  default:
    return state;
  }
};

export default walletReducer;
