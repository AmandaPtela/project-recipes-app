import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';
import { fetchRecipes, fetchCategory } from '../API/recipesAPI';

function Drinks() {
  const { content, setContent, categories, setCategories } = useContext(Context);
  const maxItens = 12;
  const maxCategories = 5;

  useEffect(() => {
    const recipesFetch = async () => {
      const recipes = await fetchRecipes('Drink');
      setContent(recipes);
    };

    const categoryFetch = async () => {
      const category = await fetchCategory('Drink');
      setCategories(category);
    };

    recipesFetch();
    categoryFetch();
  }, []);

  const categoryRender = () => categories.drinks.map((drink, index) => {
    if (index < maxCategories) {
      return (
        <button
          key={ index + drink.strCategory }
          type="button"
          data-testid={ `${drink.strCategory}-category-filter` }
        >
          {drink.strCategory}

        </button>
      );
    }
  });

  const drinkRender = () => content.drinks.map((drink, index) => {
    if (index < maxItens) {
      return (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>
            {' '}
            { drink.strDrink }
            {' '}
          </h1>
          <img
            className="test"
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>);
    }
    return null;
  });

  return (
    <div>
      <Header title="Drinks" />
      { (categories.drinks !== null
        && Object.values(categories).length >= 1) && categoryRender() }
      { (content.drinks !== null && Object.values(content).length >= 1) && drinkRender() }
      <Footer />
    </div>
  );
}

export default Drinks;
