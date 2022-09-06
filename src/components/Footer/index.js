import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../../images/drinkIcon.svg';
import MealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <input
        type="image"
        className="drink"
        src={ DrinkIcon }
        alt="Drink"
        onClick={ () => history.push('/drinks') }
        data-testid="drinks-bottom-btn"
      />

      <input
        type="image"
        className="meal"
        src={ MealIcon }
        alt="Meal"
        onClick={ () => history.push('/foods') }
        data-testid="food-bottom-btn"
      />
    </footer>
  );
}
