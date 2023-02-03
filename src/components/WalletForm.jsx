import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  fetchCurrencies,
  currencyType,
  fetchValues,
  removeState } from '../redux/actions/wallet';
import Table from './Table';

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  button: 'Adicionar Despesa',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies(currencyType));
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleClick = ({ target }, dispatch) => {
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (target.innerText === 'Editar Despesa') {
      dispatch(fetchCurrencies(removeState, { ...expense, id: id - 1 }));
    }
    if (target.innerText === 'Adicionar Despesa') {
      dispatch(fetchValues(expense));
      this.setState({ ...INITIAL_STATE, id: id + 1 });
    }
  };

  render() {
    const { currencies, dispatch, editable } = this.props;
    const { value, description, currency, method, tag, button } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="despesa">
            Valor da despesa:
            <input
              type="number"
              name="despesa"
              id="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            {' '}
            {' '}
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              defaultValue={ editable ? editable[0].currency : currency }
            >
              { (currencies)
                ? (
                  currencies.map((option) => (
                    <option
                      value={ option }
                      key={ option }
                    >
                      { option }
                    </option>
                  )))
                : ''}
            </select>
          </label>
          <label htmlFor="method">
            {' '}
            Métodos de pagamento:
            {' '}
            {' '}
            <select
              data-testid="method-input"
              id="method"
              onChange={ this.handleChange }
              defaultValue={ editable ? editable[0].method : method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            {' '}
            {' '}
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              defaultValue={ editable ? editable[0].tag : tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={ (e) => {
              e.preventDefault();
              this.handleClick(e, dispatch);
            } }
          >
            { editable ? 'Editar Despesa' : button }
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  actualValues: state.wallet.actualValues,
  editable: state.wallet.editable,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
  editable: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
