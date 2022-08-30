
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

describe('Verifica o LOGIN', () => {
  it('Verifica inputs de Email e senha', () => {
    const { history } = render(
      <Provider>
        <App />
        </Provider>
  );
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const botaoLogin = screen.getByTestId('login-submit-btn');
    expect(botaoLogin).toBeDisabled();
    
    userEvent.type(inputEmail, 'manda.com');
    userEvent.type(inputPassword, '321');
    expect(botaoLogin).toBeDisabled();

    userEvent.type(inputEmail, 'manda@email.com');
    userEvent.type(inputPassword, '3213211');
    expect(botaoLogin).not.toBeDisabled();
    userEvent.click(botaoLogin);
  });
})