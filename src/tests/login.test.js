import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const invalidEmail = 'awdawd@123';
const validEmail = 'teste@teste.com';

describe('testes para a pagina de login', () => {
  it('verifica se o login não é efetuado com um email ou senha inválidos', () => {
    renderWithRouterAndRedux(<App />);
    // captura os botões
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const button = screen.getByRole('button', { name: /entrar/i });
    const passwordInput = screen.getByTestId('password-input');
    // faz a ação de preencher o campo(email) com email inválido
    userEvent.type(emailInput, invalidEmail);
    expect(button).toBeDisabled();
    // preenche o campo(senha) com um valor válido porem com o e-mail inválido
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();
    // preenche o email valido porem com uma senha inválida
    userEvent.type(passwordInput, '123');
    userEvent.type(emailInput, validEmail);
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão é habilitado com e-mail e senha válidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
