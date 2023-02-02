import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { userInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isvalid: false,
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value }, this.verification);
  };

  verification = () => {
    const { email, senha } = this.state;
    const maxLength = 6;
    const verifyEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
    const verifyPassword = senha.length >= maxLength;
    return this.setState({
      isvalid: verifyEmail && verifyPassword,
    });
  };

  render() {
    const { isvalid, email } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
        <label htmlFor="email">
          {' '}
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          {' '}
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ !isvalid }
          onClick={ () => {
            dispatch(userInfo(email));
            history.push('/carteira');
          } }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
