import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';
import { fetchRecipes, fetchCategory, fetchContentWithCategory } from '../API/recipesAPI';

function Foods() {
  const { content, setContent, categories, setCategories } = useContext(Context);
  const maxItens = 12;
  const maxCategories = 5;

  const recipesFetch = async () => {
    const recipes = await fetchRecipes('Food');
    setContent(recipes);
  };

  const categoryFetch = async () => {
    const category = await fetchCategory('Food');
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

  const handleCategoryClick = async (food) => {
    const data = await fetchContentWithCategory('Food', food);
    setContent(data);
  };

  const categoryRender = () => categories.meals.map((food, index) => {
    if (index < maxCategories) {
      return (
        <button
          onClick={ () => handleCategoryClick(food.strCategory) }
          key={ index + food.strCategory }
          type="button"
          data-testid={ `${food.strCategory}-category-filter` }
        >
          {food.strCategory}

        </button>
      );
    }
  });

  const foodRender = () => content.meals.map((food, index) => {
    if (index < maxItens) {
      return (
        <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
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
      { (categories.meals !== null
        && Object.values(categories).length >= 1) && categoryRender() }
      {clearButton}
      { (content.meals !== null && Object.values(content).length >= 1) && foodRender() }
      <Footer />
    </div>
  );
}

export default Foods;
