import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';
import { fetchRecipes, fetchCategory, fetchContentWithCategory } from '../API/recipesAPI';
import { MAIN_PAGE_MAX_CATEGORIES, MAIN_PAGE_MAX_RECIPES } from '../helpers/magicNumbers';

function Drinks() {
  const { content, setContent, categories, setCategories } = useContext(Context);
  const history = useHistory();

  const recipesFetch = async () => {
    const recipes = await fetchRecipes('Drink');
    setContent(recipes);
  };

  const categoryFetch = async () => {
    const category = await fetchCategory('Drink');
    setCategories(category);
  };

  useEffect(() => {
    recipesFetch();
    categoryFetch();
  }, []);

  const clearButton = (
    <button
      type="button"
      onClick={ recipesFetch }
      data-testid="All-category-filter"
    >
      All

    </button>
  );

  const handleCategoryClick = async (drink, button) => {
    if (!button.target.checked) {
      recipesFetch();
    }
    if (button.target.checked) {
      const data = await fetchContentWithCategory('Drink', drink);
      setContent(data);
    }
  };

  const categoryRender = () => categories.drinks.map((drink, index) => {
    if (index < MAIN_PAGE_MAX_CATEGORIES) {
      return (
        <div key={ index + drink.strCategory }>
          <label htmlFor={ drink.strCategory }>
            <input
              id={ drink.strCategory }
              onClick={ (button) => handleCategoryClick(drink.strCategory, button) }
              type="checkbox"
              data-testid={ `${drink.strCategory}-category-filter` }
            />
            {drink.strCategory}
          </label>
        </div>
      );
    }
    return null;
  });

  const drinkRender = () => content.drinks.map((drink, index) => {
    if (index < MAIN_PAGE_MAX_RECIPES) {
      return (
        <div
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          // TROCAR URL!!!!!!!!!!!!!!!
          onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
          role="button"
          tabIndex={ 0 }
          onKeyDown={ () => history.push(`/drinks/${drink.idDrink}`) }
        >
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
      {clearButton}
      { (content.drinks !== null && Object.values(content).length >= 1) && drinkRender() }
      <Footer />
    </div>
  );
}

export default Drinks;
