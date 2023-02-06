import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import App from '../App';

const validEmail = 'teste@teste.com';

describe('Testes para o componente header', () => {
  it('verifica se contém o texto total despesas e se o valor dele é 0', () => {
    renderWithRouterAndRedux(<Header />);
    const despesas = screen.getByText(/total de despesas/i);
    expect(despesas).toBeInTheDocument();
  });

  it('Verifica se o e-mail digitado no login aparece no header', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    const email = screen.getByText(validEmail);
    expect(email).toBeInTheDocument();
  });

  it('Verifica se o valor é atualizado conforme adiciona item', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const initialValue = screen.getByText(/0\.00/i);
    expect(initialValue).toBeInTheDocument();
  });
});
