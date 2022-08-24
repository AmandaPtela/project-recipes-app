import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import fetchContent from '../API/recipesAPI';
import Carousel from '../components/Carousel';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes === null) {
    const obj = [{}];
    localStorage.setItem('doneRecipes', JSON.stringify(obj));
  }
  console.log(doneRecipes);
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsQntd, setIngredientsQntd] = useState([]);
  const [recomendations, setRecomendations] = useState();
  const type = location.pathname.split('/')[1];

  const fetchingData = async () => {
    if (type === 'foods') {
      setRecipe(await fetchContent(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    } else {
      setRecipe(await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  useEffect(() => {
    if (recipe === undefined || recomendations === undefined) return;
    console.log(recipe);
    console.log(recomendations);
    const maxIngredient = 20;
    const newArrI = [];
    const newArrQ = [];
    for (let index = 1; index <= maxIngredient; index += 1) {
      const keyI = `strIngredient${index}`;
      const keyQ = `strMeasure${index}`;
      if (type === 'foods') {
        newArrI.push(recipe.meals[0][keyI]);
        newArrQ.push(recipe.meals[0][keyQ]);
      } else {
        newArrI.push(recipe.drinks[0][keyI]);
        newArrQ.push(recipe.drinks[0][keyQ]);
      }
    }
    setIngredients([...newArrI]);
    setIngredientsQntd([...newArrQ]);
    setLoading(false);
  }, [recipe, recomendations]);

  return (
    <div>
      Foods
      {loading && 'Carregando...'}
      {!loading && (
        <div className="">
          <img
            src={ type === 'foods'
              ? recipe.meals[0].strMealThumb
              : recipe.drinks[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt={ type === 'foods'
              ? recipe.meals[0].strMeal
              : recipe.drinks[0].strDrink }
          />
          <h1 data-testid="recipe-title">
            { type === 'foods'
              ? recipe.meals[0].strMeal
              : recipe.drinks[0].strDrink}

          </h1>
          <h2 data-testid="recipe-category">
            {type === 'foods'
              ? recipe.meals[0].strCategory
              : recipe.drinks[0].strAlcoholic}

          </h2>
          {ingredients.map(
            (ingredient, i) => (
              <div className="" key={ ingredient }>
                <span data-testid={ `${i}-ingredient-name-and-measure` }>
                  {ingredientsQntd[i]}
                  {' '}
                  {ingredient}
                </span>
              </div>),
          )}
          <h2 data-testid="instructions">
            { type === 'foods'
              ? recipe.meals[0].strInstructions
              : recipe.drinks[0].strInstructions}

          </h2>
          {type === 'foods' && (
            <iframe
              width="560"
              data-testid="video"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.meals[0].strYoutube.split('=')[1]}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <Carousel
            data={ type === 'foods'
              ? recomendations.drinks : recomendations.meals }
            type={ type }
          />
        </div>
      )}
      {doneRecipes !== null && !doneRecipes.some((e) => e.id === id)
      && (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
        >
          Start Recipe
        </button>)}

    </div>
  );
}

export default RecipeDetails;
