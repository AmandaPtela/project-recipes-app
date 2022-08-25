import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeInProgress } from '../API/recipesAPI';
import inProgressRender from '../components/InProgressRender';
import { retrieveLocalStorage } from '../helpers/localStorage';
import { INTERVAL_FOR_LOCALSTORAGE_RETRIEVE } from '../helpers/magicNumbers';

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
    // REFATORAR AQUI!!!!!!!!! COMPLEXIDADE ALTA NA FUNÇÃO
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

  useEffect(() => {
    getRecipe();
    isChecked();
  }, []);

  return (
    <div>
      { inProgressRender(id, fetchedRecipe) }
    </div>);
}

export default RecipeInProgress;
