import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
          <p data-testid="email-field" >{ email }</p>
          <div>
            <p>total de despesas</p>
            <p data-testid="total-field" >0</p>
            <p data-testid="header-currency-field" >BRL</p>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
})

export default connect(mapStateToProps)(Header);
