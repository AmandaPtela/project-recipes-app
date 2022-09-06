import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';
import { fetchRecipes, fetchCategory, fetchContentWithCategory } from '../API/recipesAPI';
import { MAIN_PAGE_MAX_CATEGORIES, MAIN_PAGE_MAX_RECIPES } from '../helpers/magicNumbers';

function Foods() {
  const { content, setContent, categories,
    setCategories } = useContext(Context);
  const history = useHistory();

  const recipesFetch = async () => {
    const recipes = await fetchRecipes('Food');
    act(() => {
      setContent(recipes);
    });
  };

  const categoryFetch = async () => {
    const category = await fetchCategory('Food');
    act(() => {
      setCategories(category);
    });
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

  const handleCategoryClick = async (food, button) => {
    if (!button.target.checked) {
      act(() => {
        recipesFetch();
      });
    }
    if (button.target.checked) {
      const data = await fetchContentWithCategory('Food', food);
      act(() => {
        setContent(data);
      });
    }
  };

  const categoryRender = () => categories.meals.map((food, index) => {
    if (index < MAIN_PAGE_MAX_CATEGORIES) {
      return (
        <div key={ index + food.strCategory }>
          <label htmlFor={ food.strCategory }>
            <input
              id={ food.strCategory }
              onClick={ (button) => handleCategoryClick(food.strCategory, button) }
              type="checkbox"
              data-testid={ `${food.strCategory}-category-filter` }
            />
            {food.strCategory}
          </label>

        </div>
      );
    }
    return null;
  });

  const foodRender = () => content.meals.map((food, index) => {
    if (index < MAIN_PAGE_MAX_RECIPES) {
      return (
        <div
          key={ food.idMeal }
          data-testid={ `${index}-recipe-card` }
          // TROCAR URL!!!!!!!!!!!!!!!
          onClick={ () => history.push(`/foods/${food.idMeal}`) }
          role="button"
          tabIndex={ 0 }
          onKeyDown={ () => history.push(`/foods/${food.idMeal}`) }
        >
          <h1 data-testid={ `${index}-card-name` }>
            {' '}
            { food.strMeal }
            {' '}
          </h1>
          <img
            className="test"
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
        </div>);
    }
    return null;
  });

  return (
    <div>
      <Header title="Foods" />
      { (categories.meals !== null && categories.meals !== undefined
        && Object.values(categories).length >= 1) && categoryRender() }
      {clearButton}
      { (content.meals !== null && content.meals !== undefined
        && Object.values(content).length >= 1) && foodRender() }
      <Footer />
    </div>
  );
}

export default Foods;
