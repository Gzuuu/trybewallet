import React from 'react';
import { connect } from 'react-redux';
import { userInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    validEmail: false,
    validKey: false,
    isvalid: false,
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({[id]: value }, this.verification)
  }

  verification = () => {
    const { email, senha } = this.state;
    const verifyEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
    const verifyPassword = senha.length >= 6;
    return this.setState({
      validEmail: verifyEmail,
      validKey: verifyPassword,
      isvalid: verifyEmail && verifyPassword,
    });
  }

  render() {
    const { isvalid, email } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
          <label htmlFor="email"> Email:
            <input 
              data-testid="email-input" 
              type="email" 
              name="email" 
              id="email" 
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password"> Senha:
            <input 
              data-testid="password-input" 
              type="password" 
              name="password" 
              id="senha" 
              onChange={ this.handleChange } 
            />
          </label>
          <button disabled={ !isvalid } onClick={ () => {
            dispatch(userInfo(email))
            history.push('/carteira')
          } } >Entrar</button>
      </div>
    )
  }
}

export default connect(null)(Login);
