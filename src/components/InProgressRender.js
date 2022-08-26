import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import { DRINK_RENDER_CHECKBOX, FOOD_RENDER_CHECKBOX,
  PATHNAME_SLICE_FOOD, PATHNAME_SLICE_DRINK } from '../helpers/magicNumbers';
import { removeLocalStorage, saveLocalStorage } from '../helpers/localStorage';

function InProgressRender(params) {
  const { id, fetchedRecipe } = params;
  const location = useLocation();
  const [buttonState, setbuttonState] = useState(true);

  const handleChecked = () => {
    if (id[0] === '5' && fetchedRecipe) {
      const allCheckeds = document.querySelectorAll('input[type="checkbox"]').length;
      const food = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id].length;
      if (food === allCheckeds) {
        setbuttonState(false);
      } else {
        setbuttonState(true);
      }
    } else if (id[0] === '1' && fetchedRecipe) {
      const allCheckeds = document.querySelectorAll('input[type="checkbox"]').length;
      const drinks = JSON.parse(localStorage
        .getItem('inProgressRecipes')).cocktails[id].length;
      if (drinks === allCheckeds) {
        setbuttonState(false);
      } else {
        setbuttonState(true);
      }
    }
  };

  const checkboxClick = ({ target }, ingredient) => {
    if (target.checked) {
      saveLocalStorage(id, ingredient);
    }
    if (!target.checked) {
      removeLocalStorage(id, ingredient);
    }
    handleChecked();
  };

  const handleShareButton = ({ target }) => {
    if (id[0] === '5') {
      const pathname = location.pathname.slice(0, PATHNAME_SLICE_FOOD);
      Copy(`http://localhost:3000${pathname}`);
    }
    if (id[0] === '1') {
      const pathname = location.pathname.slice(0, PATHNAME_SLICE_DRINK);
      Copy(`http://localhost:3000${pathname}`);
    }
    target.innerHTML = 'Link copied!';
  };

  const renderRecipe = () => {
    if (id[0] === '5' && fetchedRecipe) {
      const food = fetchedRecipe.meals[0];

      return (
        <div id="recipe-in-progress-card">
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{food.strMeal}</h3>
          <h4 data-testid="recipe-category">{food.strCategory}</h4>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ (button) => handleShareButton(button) }
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          {Array.from({ length: FOOD_RENDER_CHECKBOX }, (i, index) => {
            const ing = `strIngredient${JSON.stringify(index + 1)}`;
            if (food[ing] !== '' && food[ing] !== null) {
              return (
                <div key={ index }>
                  <label
                    htmlFor={ `${food[ing]}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${food[ing]}-ingredient-step` }
                      onClick={ (button) => {
                        checkboxClick(button, food[ing]);
                      } }
                    />
                    {food[ing]}
                  </label>
                </div>
              );
            }
            return null;
          })}
          <p data-testid="instructions">{food.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ buttonState }
          >
            Finish Recipe
          </button>
        </div>
      );
    }
    if (id[0] === '1' && fetchedRecipe) {
      const drink = fetchedRecipe.drinks[0];

      return (
        <div id="recipe-in-progress-card">
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{drink.strDrink}</h3>
          <h4 data-testid="recipe-category">{drink.strCategory}</h4>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ (button) => handleShareButton(button) }
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          {Array.from({ length: DRINK_RENDER_CHECKBOX }, (i, index) => {
            const ing = `strIngredient${JSON.stringify(index + 1)}`;
            if (drink[ing] !== null && drink[ing] !== '') {
              return (
                <div key={ index }>
                  <label
                    htmlFor={ `${drink[ing]}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${drink[ing]}-ingredient-step` }
                      onClick={ (button) => checkboxClick(button, drink[ing]) }
                    />
                    {drink[ing]}
                  </label>
                </div>
              );
            }
            return null;
          })}
          <p data-testid="instructions">{drink.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ buttonState }
          >
            Finish Recipe
          </button>
        </div>
      );
    }
    return (
      <p>Carregando...</p>
    );
  };

  return (
    <div>
      { renderRecipe() }
    </div>
  );
}

export default InProgressRender;
