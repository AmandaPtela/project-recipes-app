import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';

function Foods() {
  const { content } = useContext(Context);
  const maxItens = 12;

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
