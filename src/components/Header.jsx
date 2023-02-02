import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sum = () => {
    const { expenses } = this.props;
    const totalPrice = expenses.map((expense) => {
      const { value, exchangeRates, currency } = expense;
      const rate = exchangeRates[currency].ask;
      return rate * value;
    });
    return totalPrice.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <div>
          <p>total de despesas</p>
          <p data-testid="total-field">{expenses !== [] ? this.sum() : 0}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}.isRequired;

export default connect(mapStateToProps)(Header);
