import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                {(Number(expense.exchangeRates[expense.currency].ask)
              * Number(expense.value)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}.isRequired;

export default connect(mapStateToProps)(Table);
