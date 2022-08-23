import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';
import { fetchRecipes } from '../API/recipesAPI';

function Foods() {
  const { content, setContent } = useContext(Context);
  const maxItens = 12;

  useEffect(() => {
    const renderRecipes = async () => {
      const recipes = await fetchRecipes('Food');
      setContent(recipes);
    };
    renderRecipes();
  }, []);

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
      { (content.meals !== null && Object.values(content).length >= 1) && foodRender() }
      <Footer />
    </div>
  );
}

export default Foods;
