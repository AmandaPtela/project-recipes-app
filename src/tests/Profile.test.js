
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

describe('Verifica o LOGIN', () => {
  it('Verifica inputs de Email e senha', async () => {
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

    await new Promise((r) => setTimeout(r, 1000))

    const profileButton = screen.getByTestId('profile-top-btn')

    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    await new Promise((r) => setTimeout(r, 1000))

    const user = screen.getByText('manda.commanda@email.com')

    expect(user).toBeInTheDocument();

    const button1 = screen.getByTestId('profile-done-btn')
    const button2 = screen.getByTestId('profile-favorite-btn')
    const button3 = screen.getByTestId('profile-logout-btn')

    expect(button1 && button2 && button3).toBeInTheDocument();

    userEvent.click(button3);

    const inputEmail2 = screen.getByTestId('email-input');
    const inputPassword2 = screen.getByTestId('password-input');
    const botaoLogin2 = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail2, 'manda@email.com');
    userEvent.type(inputPassword2, '3213211');
  
    userEvent.click(botaoLogin2);

    await new Promise((r) => setTimeout(r, 1000))

    const profileButton2 = screen.getByTestId('profile-top-btn')

    expect(profileButton2).toBeInTheDocument();

    userEvent.click(profileButton2);

    await new Promise((r) => setTimeout(r, 1000))

    const button4 = screen.getByTestId('profile-favorite-btn')

    userEvent.click(button4);

    const profile = screen.getByTestId('profile-top-btn')

    userEvent.click(profile);

    const button5 = screen.getByTestId('profile-done-btn')

    userEvent.click(button5)
  });
})