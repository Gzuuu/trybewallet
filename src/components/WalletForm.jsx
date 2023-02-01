import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="despesa">Valor da despesa:
          <input type="number" name="despesa" id="despesa" data-testid="value-input"/>
        </label>
        <label htmlFor="description">Descrição da despesa:
          <input type="text" name="description" id="descricao" data-testid="description-input" />
        </label>
        <label htmlFor="currency">Moeda:
        {' '}
        {' '}
          <select id="currency" data-testid="currency-input" >
            {currencies.map(option => <option value={ option } key={ option } >{ option }</option>)}
          </select>
        </label>
        <label htmlFor="method"> Métodos de pagamento:
        {' '}
        {' '}
          <select data-testid="method-input" id="method" defaultValue="money" >
            <option value="money" >Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">Categoria:
        {' '}
        {' '}
          <select id="category" data-testid="tag-input" >
            <option value="food">Alimentação</option>
            <option value="recreation">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
currencies: state.wallet.currencies,
})

export default connect(mapStateToProps)(WalletForm);
