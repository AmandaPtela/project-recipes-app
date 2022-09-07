import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

describe('Verifica o DRINKS', () => {
  it('Verifica os DRINKS', async () => {
    const { history } = render(
      <Provider>
        <App />
      </Provider>
  );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const botaoLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'manda@email.com');
    userEvent.type(inputPassword, '3213211');

    userEvent.click(botaoLogin);

    await new Promise((r) => setTimeout(r, 1000))

    
  });
})