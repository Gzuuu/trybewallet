import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchCurrencies, currencyType, fetchValues } from '../redux/actions/wallet';
import Table from './Table';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies(currencyType));
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleClick = () => {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
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
            <select data-testid="method-input" id="method" onChange={ this.handleChange }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            {' '}
            {' '}
            <select id="tag" data-testid="tag-input" onChange={ this.handleChange }>
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
              dispatch(fetchValues(expense));
              this.handleClick();
            } }
          >
            Adicionar despesa

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
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
