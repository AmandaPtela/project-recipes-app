import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeInProgress } from '../API/recipesAPI';

function RecipeInProgress() {
  const [fetchedRecipe, setFetchedRecipe] = useState();
  const { id } = useParams();

  const getRecipe = async () => {
    if (id[0] === '5') {
      const data = await fetchRecipeInProgress('Food', id);
      console.log(data);
      setFetchedRecipe(data);
    }
    if (id[0] === '1') {
      const data = await fetchRecipeInProgress('Drink', id);
      console.log(data);
      setFetchedRecipe(data);
    }
  };

  useEffect(() => {
    getRecipe();
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
          {Array.from({ length: 20 }, (i, index) => {
            const ing = `strIngredient${JSON.stringify(index + 1)}`;
            if (food[ing] !== '' && food[ing] !== null) {
              return (
                <div key={ index }>
                  <label htmlFor={ `${index}-ingredient-step` }>
                    <input
                      type="checkbox"
                      data-testid={ `${index}-ingredient-step` }
                      id={ `${index}-ingredient-step` }
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
      console.log(fetchedRecipe);
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
          {Array.from({ length: 15 }, (i, index) => {
            const ing = `strIngredient${JSON.stringify(index + 1)}`;
            if (drink[ing] !== null && drink[ing] !== '') {
              return (
                <div key={ index }>
                  <label htmlFor={ `${index}-ingredient-step` }>
                    <input
                      type="checkbox"
                      data-testid={ `${index}-ingredient-step` }
                      id={ `${index}-ingredient-step` }
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
