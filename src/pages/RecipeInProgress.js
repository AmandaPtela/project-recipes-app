import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeInProgress } from '../API/recipesAPI';
import { removeLocalStorage, retrieveLocalStorage,
  saveLocalStorage } from '../helpers/localStorage';
import { DRINK_RENDER_CHECKBOX, FOOD_RENDER_CHECKBOX,
  INTERVAL_FOR_LOCALSTORAGE_RETRIEVE } from '../helpers/magicNumbers';

function RecipeInProgress() {
  const [fetchedRecipe, setFetchedRecipe] = useState();
  const [localStorageRecipe] = useState(retrieveLocalStorage());
  const { id } = useParams();

  const getRecipe = async () => {
    if (id[0] === '5') {
      const data = await fetchRecipeInProgress('Food', id);
      setFetchedRecipe(data);
    }
    if (id[0] === '1') {
      const data = await fetchRecipeInProgress('Drink', id);
      setFetchedRecipe(data);
    }
  };

  const isChecked = () => {
    setTimeout(() => {
      if (localStorageRecipe) {
        if (id[0] === '5') {
          const ingredients = ((localStorageRecipe.meals[id]));

          if (ingredients !== undefined && ingredients !== null) {
            ingredients.forEach((ing) => {
              const element = document.getElementById(`${ing}-ingredient-step`);
              element.defaultChecked = true;
            });
          }
        }

        if (id[0] === '1') {
          const ingredients = ((localStorageRecipe.cocktails[id]));

          if (ingredients !== undefined && ingredients !== null) {
            ingredients.forEach((ing) => {
              const element = document.getElementById(`${ing}-ingredient-step`);
              element.defaultChecked = true;
            });
          }
        }
      }
    }, INTERVAL_FOR_LOCALSTORAGE_RETRIEVE);
  };

  const checkboxClick = ({ target }, ingredient) => {
    if (target.checked) {
      saveLocalStorage(id, ingredient);
    }
    if (!target.checked) {
      removeLocalStorage(id, ingredient);
    }
  };

  useEffect(() => {
    getRecipe();
    isChecked();
    console.log('STATE', localStorageRecipe);
  }, []);

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
      {renderRecipe()}
    </div>);
}
export default RecipeInProgress;
