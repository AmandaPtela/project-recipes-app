import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

describe('Verifica o HEADER e o FOOTER dos DRINKS', () => {
  it('Verifica se o HEADER e o FOOTER estão OK - FOOD', () => {
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

    const footerFoodImg = screen.getByTestId('food-bottom-btn');

    expect(footerFoodImg).toBeInTheDocument();

    fireEvent.click(footerFoodImg);

    const headerTextDrink = screen.getByText(/foods/i);

    const searchButton2 = screen.getByTestId('search-top-btn')

    expect(searchButton2).toBeInTheDocument();
    expect(headerTextDrink).toBeInTheDocument();

    fireEvent.click(searchButton2);
  })
});
