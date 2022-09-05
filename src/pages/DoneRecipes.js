import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();
  const [copyLink, setCopyLink] = useState(false);
  const [filter, setFilter] = useState('All');
  const [filtredArray, setFiltredArray] = useState();

  useEffect(() => {
    if (doneRecipes !== null && doneRecipes !== undefined) {
      setFiltredArray([...doneRecipes]);
    }
  }, []);

  useEffect(() => {
    switch (filter) {
    case 'All':
      if (doneRecipes !== null && doneRecipes !== undefined) {
        setFiltredArray([...doneRecipes]);
      }
      break;
    case 'Food':
      setFiltredArray(doneRecipes.filter((e) => e.type === 'food'));
      break;
    case 'Drink':
      setFiltredArray(doneRecipes.filter((e) => e.type === 'drink'));
      break;
    default:
      break;
    }
  }, [filter]);

  const redirect = (id, category) => {
    history.push(`/${category}s/${id}`);
  };
  return (
    <div>
      <Header title="Done Recipes" />
      <div className="">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('Food') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('Drink') }
        >
          Drinks

        </button>
      </div>
      { console.log(filtredArray)}
      {filtredArray !== undefined && filtredArray.length > 0
       && filtredArray.map((recipe, i) => (
         <div className="" key={ recipe.id }>
           <div
             className=""
             onClick={ () => redirect(recipe.id, recipe.type) }
             role="button"
             onKeyDown={ () => redirect(recipe.id, recipe.type) }
             tabIndex={ 0 }
           >
             <img
               src={ recipe.image }
               style={ { width: '250px' } }
               alt=""
               data-testid={ `${i}-horizontal-image` }
             />
           </div>
           {recipe.type === 'food'
             ? (
               <h1
                 data-testid={ `${i}-horizontal-top-text` }
               >
                 {`${recipe.nationality} - ${recipe.category}`}

               </h1>)
             : (
               <h1
                 data-testid={ `${i}-horizontal-top-text` }
               >
                 {`${recipe.alcoholicOrNot}`}
               </h1>)}
           <div
             className=""
             onClick={ () => redirect(recipe.id, recipe.type) }
             role="button"
             onKeyDown={ () => redirect(recipe.id, recipe.type) }
             tabIndex={ 0 }
           >
             <h3
               data-testid={ `${i}-horizontal-name` }

             >
               {recipe.name}
             </h3>
           </div>
           <h5 data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</h5>
           <button
             type="button"
             onClick={ () => { setCopyLink(true); copy(`http://localhost:3000/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}`); } }
           >
             <img
               src={ ShareIcon }
               data-testid={ `${i}-horizontal-share-btn` }
               alt=""
               srcSet=""
             />
           </button>
           {recipe.tags.map(
             (tag, index) => index <= 2 && (
               <p
                 data-testid={ `${i}-${tag}-horizontal-tag` }
                 key={ tag }
               >
                 {tag}
               </p>),
           )}
           {copyLink && <p>Link copied!</p>}
         </div>
       ))}
    </div>
  );
}

export default DoneRecipes;
