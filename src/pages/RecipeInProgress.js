import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeInProgress } from '../API/recipesAPI';

function RecipeInProgress() {
  const [fetchedRecipe, setFetchedRecipe] = useState();
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

  const retrieveLocalStorage = () => {
    if (!window.localStorage.getItem('inProgressRecipes')) {
      if (id[0] === '5') {
        const createLocalStorage = {
          cocktails: {
          },
          meals: {
            [id]: null,
          },
        };

        window.localStorage.setItem('inProgressRecipes',
          JSON.stringify(createLocalStorage));
      }

      if (id[0] === '1') {
        const createLocalStorage = {
          cocktails: {
            [id]: null,
          },
          meals: {
          },
        };

        window.localStorage.setItem('inProgressRecipes',
          JSON.stringify(createLocalStorage));
      }
    }

    console.log('LOCAL STORAGE AO CARREGAR:',
      JSON.parse(window.localStorage.getItem('inProgressRecipes')));
  };

  useEffect(() => {
    getRecipe();
    retrieveLocalStorage();
  }, []);

  const teste = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
  console.log(teste.meals);

  // eslint-disable-next-line react-func/max-lines-per-function
  const saveSteps = (ingredientID, { target }) => {
    const storage = JSON.parse(window.localStorage.getItem('inProgressRecipes'));

    if (target.checked && id[0] === '5') {
      if (storage.meals[id] === null) {
        const newStorage = {
          cocktails: {
            ...storage.cocktails,
          },
          meals: {
            [id]: [ingredientID],
          },
        };

        window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }

      if (storage.meals[id] !== null && !storage.meals[id]) {
        const newStorage = {
          cocktails: {
            ...storage.cocktails,
          },
          meals: {
            ...storage.meals,
            [id]: [ingredientID],
          },
        };

        window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }

      if (storage.meals[id] !== null && storage.meals[id]
        && !storage.meals[id].includes(ingredientID)) {
        const newStorage = {
          cocktails: {
            ...storage.cocktails,
          },
          meals: {
            ...storage.meals,
            [id]: [...storage.meals[id], ingredientID],
          },
        };

        window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }
    }

    if (!target.checked && id[0] === '5' && storage) {
      const actualItemStorage = storage.meals[id];
      const removedItem = actualItemStorage.filter((item) => item !== ingredientID);

      const newStorage = {
        cocktails: {
          ...storage.cocktails,
        },
        meals: {
          ...storage.meals,
          [id]: [removedItem],
        },
      };

      window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
  };

  // console.log(storage);

  // console.log('É pra adicionar a PRIMEIRA vez');
  // const newStorage = {
  //   cocktails: {
  //   },
  //   meals: {
  //     [id]: [...storage.meals[id], ingredientID],
  //   },
  // };

  // window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));

  // if (Object.entries(storage.meals)[0].includes(id)
  //     && !storage.meals[id].includes(ingredientID)) {
  //   console.log('É pra adicionar mais de um');
  //   const newStorage = {
  //     meals: {
  //       [id]: [...storage.meals[id], ingredientID],
  //     },
  //   };

  //   window.localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  // }

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
                  <label
                    htmlFor={ `${index}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${index}-ingredient-step` }
                      onChange={ (origin) => saveSteps(food[ing], origin) }
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
                  <label
                    htmlFor={ `${index}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
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
