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


    const obj = {
      id: "52977",
      type: 'food',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
    };

    // window.localStorage.setItem('favoriteRecipes', JSON.stringify(obj))

    // const profile = screen.getByTestId('profile-top-btn');

    // userEvent.click(profile);

    // const favorites = screen.getByTestId('profile-favorite-btn');

    // userEvent.click(favorites);

    // const food = screen.getByText(/turkish/i);

    // expect(food).toBeInTheDocument();
  });
})