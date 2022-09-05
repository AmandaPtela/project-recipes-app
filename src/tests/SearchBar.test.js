import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchRecipes, fetchContent } from '../API/recipesAPI';
import { Provider } from '../context/Provider';
import App from '../App';

describe('Verifica a SearchBar', () => {
  it('Verifica a SearchBar - Busca por Ingrediente',async () => {
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

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Chicken')
    userEvent.click(radioButton1)
    userEvent.click(searchButton)

    await fetchContent('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')
    await new Promise((r) => setTimeout(r, 1000));

    const firstFood = screen.getByText(/chicken handi/i)

    expect(firstFood).toBeInTheDocument();

    userEvent.click(searchComponent);

    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica a SearchBar - Busca por Primeira Letra',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'a')
    userEvent.click(radioButton3)
    userEvent.click(searchButton)

    await fetchContent('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    await new Promise((r) => setTimeout(r, 1000));

    const secondFood = screen.getByText(/apple frangipan tart/i)

    expect(secondFood).toBeInTheDocument();
  });

  it('Verifica a SearchBar - Busca por Primeira Letra com ALERTA! ',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'ab')
    userEvent.click(radioButton3)
    userEvent.click(searchButton)
  });

  it('Verifica a SearchBar - Busca por Algo que Não Existe',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'icecream')
    userEvent.click(radioButton2)
    userEvent.click(searchButton)
  });

  it('Verifica a SearchBar - Busca por um Único',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata')
    userEvent.click(radioButton2)
    userEvent.click(searchButton)
  });

  it('Verifica a SearchBar - Busca por um Único',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata')
    userEvent.click(radioButton2)
    userEvent.click(searchButton)
  });

  it('Verifica a SearchBar - Buscas em Drinks',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const drinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinks);

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'mint')
    userEvent.click(radioButton1)
    userEvent.click(searchButton)

    await new Promise((r) => setTimeout(r, 2000))

    const firstDrink = screen.getByText(/derby/i)

    expect(firstDrink).toBeInTheDocument();

  });

  it('Verifica a SearchBar - Buscas em Drinks',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const drinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinks);

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'frozen')
    userEvent.click(radioButton2)
    userEvent.click(searchButton)

    await new Promise((r) => setTimeout(r, 1000))
    
    const secondDrink = screen.getByText(/frozen daiquiri/i)

    expect(secondDrink).toBeInTheDocument();

  });

  it('Verifica a SearchBar - Buscas em Drinks',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const drinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinks);

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'frozen')
    userEvent.click(radioButton2)
    userEvent.click(searchButton)

    await new Promise((r) => setTimeout(r, 1000))
    
    const secondDrink = screen.getByText(/frozen daiquiri/i)

    expect(secondDrink).toBeInTheDocument();

  });

  it('Verifica a SearchBar - Buscas em Drinks',async () => {
    render(
      <Provider>
        <App />
        </Provider>
  );

    await fetchRecipes('Food');

    const drinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinks);

    const searchComponent = screen.getByTestId('search-top-btn')

    expect(searchComponent).toBeInTheDocument();

    fireEvent.click(searchComponent);

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument();

    const radioButton1 = screen.getByLabelText(/ingredient/i);
    const radioButton2 = screen.getByLabelText(/name/i);
    const radioButton3 = screen.getByLabelText(/primeira letra/i);
    const searchButton = screen.getByTestId('exec-search-btn')

    expect(radioButton1 && radioButton2 && radioButton3 && searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'b')
    userEvent.click(radioButton3)
    userEvent.click(searchButton)

    await new Promise((r) => setTimeout(r, 1000))
    
    const secondDrink = screen.getByText(/b-53/i)

    expect(secondDrink).toBeInTheDocument();

  });
});