import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from '../context/Provider';

import App from '../App';

jest.setTimeout(10000)

describe('Verifica os FAVORITOS', () => {
  it('Verifica os FAVORITOS', async () => {
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

    await new Promise((r) => setTimeout(r, 1000));

    const corbaFood = screen.getByText(/corba/i);

    userEvent.click(corbaFood);

    await new Promise((r) => setTimeout(r, 2000));

    const favoriteButton = screen.getByTestId('favorite-btn')

    userEvent.click(favoriteButton);

    const favoriteRedirect = screen.getByTestId('my-favorites');

    userEvent.click(favoriteRedirect);

    await new Promise((r) => setTimeout(r, 1000));
    
    const favoritesTitle = screen.getByText(/favorite recipes/i);
    const favoriteMeal = screen.getByText(/turkish - side/i);
    const favoriteName = screen.getByText(/corba/i);
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-food-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    const favButton = screen.getByTestId('0-horizontal-favorite-btn');

    expect(favoritesTitle && favoriteMeal && favoriteName && allButton && foodButton
      && drinkButton && shareButton && favButton).toBeInTheDocument();

    userEvent.click(allButton);
    userEvent.click(foodButton);
    userEvent.click(favoriteName);
    userEvent.click(favoriteRedirect);

    await new Promise((r) => setTimeout(r, 1000))

    const favoriteName2 = screen.getByText(/corba/i);

    expect(favoriteName2).toBeInTheDocument();
    const favButton2 = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(favButton2);
    
    expect(favoriteName).not.toBeInTheDocument();

    userEvent.click(drinkButton);
  });
})