import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function BtnRecipe({ doneRecipes, id, isInProgress }) {
  const history = useHistory();
  return (
    <div>
      {doneRecipes !== null && !doneRecipes.some((e) => e.id === id)
      && (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
          onClick={ () => history.push(`${id}/in-progress`) }
        >
          {isInProgress === true ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </div>
  );
}

BtnRecipe.propTypes = {
  doneRecipes: PropTypes.array,
  id: PropTypes.number,
  isInProgress: PropTypes.bool,
}.isRequired;
