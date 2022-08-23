import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Provider';

function Drinks() {
  const { content } = useContext(Context);
  const maxItens = 12;

  const drinkRender = () => content.drinks.map((food, index) => {
    if (index < maxItens) {
      return (
        <div key={ food.idDrink } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>
            {' '}
            { food.strDrink }
            {' '}
          </h1>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strDrinkThumb }
            alt={ food.strDrink }
          />
        </div>);
    }
    return null;
  });

  return (
    <div>
      <Header title="Drinks" />
      { (content.drinks !== null && Object.values(content).length >= 1) && drinkRender() }
      <Footer />
    </div>
  );
}

export default Drinks;
