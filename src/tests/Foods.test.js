import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchRecipes, fetchCategory, fetchContentWithCategory } from '../API/recipesAPI';
import { Provider } from '../context/Provider';

const flushPromises = require('flush-promises')

import App from '../App';

// const flushPromises = () => new Promise(setImmediate)
const tabKey = new KeyboardEvent('keydown', { key: 9 });
const spaceKey = new KeyboardEvent('keydown', { key: 32 })

describe('Verifica a página de FOODS', () => {
  it('Verifica a página de FOODS',async () => {
  render(
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

    const recipes = await fetchRecipes('Food');

    expect(typeof recipes).toBe('object');

    await new Promise((r) => setTimeout(r, 500));

    const firstFood = screen.getByText(/burek/i)
    
    expect(firstFood).toBeInTheDocument();

    await fetchCategory('Food')

    const firstCategory = screen.getByText(/beef/i);
    const secondCategory = screen.getByText(/breakfast/i)
    
    expect(firstCategory && secondCategory).toBeInTheDocument();

    fireEvent.click(firstCategory);

    await fetchContentWithCategory('Food', 'beef');

    await new Promise((r) => setTimeout(r, 500));

    const secondFood = screen.getByText(/beef and mustard pie/i)

    expect(secondFood).toBeInTheDocument();

    const allCategory = screen.getByRole('button' , {name: 'All'})
    
    expect(allCategory).toBeInTheDocument();

    userEvent.click(allCategory)

    await new Promise((r) => setTimeout(r, 1000))

    const thirdFood = screen.getByText(/corba/i);
    
    expect(thirdFood).toBeInTheDocument();

    fireEvent.keyDown(thirdFood, { key: 'Tab', code: 'Tab', charCode: 9 })

    fireEvent.keyDown(thirdFood, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(thirdFood);

    const { pathname } = global.window.location
    
    expect(pathname).toBe('/foods/52977')

    await new Promise((r) => setTimeout(r, 1000))

    const detailTitle = screen.getByTestId('recipe-title')
    const detailCategory = screen.getByTestId('recipe-category')
    const detailStepOne = screen.getByText(/1 cup lentils/i)

    expect(detailTitle && detailCategory && detailStepOne).toBeInTheDocument();

    const carousel = screen.getByTestId('1-recomendation-card')
    
    expect(carousel).toBeInTheDocument();
  })
});
