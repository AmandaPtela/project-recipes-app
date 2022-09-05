import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { fetchContent } from '../API/recipesAPI';
import BtnRecipe from '../components/BtnRecipe';
import Carousel from '../components/Carousel';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteRecipes);
  if (doneRecipes === null) {
    const obj = [{}];
    const objProgress = {
      cocktails: {
        178319: [],
      },
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objProgress));
    localStorage.setItem('doneRecipes', JSON.stringify(obj));
  }
  if (favoriteRecipes === null) {
    const obj = [{}];
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
  }
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsQntd, setIngredientsQntd] = useState([]);
  const [recomendations, setRecomendations] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
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
    const i = type === 'drinks' ? 'cocktails' : 'meals';
    if (inProgressRecipes !== null) {
      const allInProgress = Object.keys(inProgressRecipes[i]);
      setIsInProgress(allInProgress.some((e) => e === id));
      setIsFavorite(favoriteRecipes.some((e) => e.id === id));
    }
    if (favoriteRecipes !== null && Object.keys(favoriteRecipes[0]).length !== 0) {
      setIsFavorite(favoriteRecipes.some((e) => e.id === id));
    }
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

  const notFav = () => {
    const newArr = favoriteRecipes.filter((e) => e.id !== id);
    if (newArr.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{}]));
      setIsFavorite(false);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    setIsFavorite(false);
  };

  const handleFav = () => {
    if (!isFavorite) {
      const obj = {
        id,
        type: type === 'foods' ? 'food' : 'drink',
        nationality: type === 'foods' ? recipe.meals[0].strArea : '',
        category: type === 'foods'
          ? recipe.meals[0].strCategory : recipe.drinks[0].strCategory,
        alcoholicOrNot: type === 'foods' ? '' : 'Alcoholic',
        name: type === 'foods' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink,
        image: type === 'foods'
          ? recipe.meals[0].strMealThumb : recipe.drinks[0].strDrinkThumb,
      };
      const newArr = Object.keys(favoriteRecipes[0]).length === 0
        ? [obj] : [...favoriteRecipes, obj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(true);
      return;
    }
    notFav();
  };
  return (
    <div>
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
              <div className="" key={ ingredient + i }>
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
      <BtnRecipe
        type={ type }
        doneRecipes={ doneRecipes }
        id={ id }
        isInProgress={ isInProgress }
      />
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => { setCopyLink(true); copy(`http://localhost:3000${location.pathname}`); } }
      >
        <img src={ ShareIcon } alt="" srcSet="" />
      </button>
      <button type="button" onClick={ handleFav }>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
      {copyLink && <p>Link copied!</p>}
      <button
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        My Favorites
      </button>
    </div>
  );
}

export default RecipeDetails;
