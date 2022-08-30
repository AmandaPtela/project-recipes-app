import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

describe('Verifica o HEADER e o FOOTER dos DRINKS', () => {
  it('Verifica se o HEADER e o FOOTER estão OK - DRINK', () => {
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
  
    const searchButton = screen.getByTestId('search-top-btn')
    const headerTextFood = screen.getByText(/foods/i);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');

    expect(headerTextFood).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    const footerDrinkIcon = screen.getByTestId('drinks-bottom-btn');

    expect(footerDrinkIcon).toBeInTheDocument();

    fireEvent.click(footerDrinkIcon);

    const headerTextDrink = screen.getByText(/drinks/i);

    const searchButton2 = screen.getByTestId('search-top-btn')

    expect(searchButton2).toBeInTheDocument();
    expect(headerTextDrink).toBeInTheDocument();

    fireEvent.click(searchButton2);

    const searchInput2 = screen.getByTestId('search-input');

    expect(searchInput2).toBeInTheDocument();
  })
});
