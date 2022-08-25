import React from 'react';
import { DRINK_RENDER_CHECKBOX, FOOD_RENDER_CHECKBOX } from '../helpers/magicNumbers';
import { removeLocalStorage, saveLocalStorage } from '../helpers/localStorage';

function inProgressRender(id, API) {
  const checkboxClick = ({ target }, ingredient) => {
    if (target.checked) {
      console.log(target.parentElement.style.textDecoration);
      saveLocalStorage(id, ingredient);
    }
    if (!target.checked) {
      removeLocalStorage(id, ingredient);
    }
  };

  const renderRecipe = () => {
    if (id[0] === '5' && API) {
      const food = API.meals[0];

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
                    htmlFor={ `${index}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${food[ing]}-ingredient-step` }
                      onClick={ (button) => checkboxClick(button, food[ing]) }
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
          >
            Finish Recipe
          </button>
        </div>
      );
    }
    if (id[0] === '1' && API) {
      const drink = API.drinks[0];

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
                    htmlFor={ `${index}-ingredient-step` }
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

export default inProgressRender;
