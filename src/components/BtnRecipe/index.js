import React from 'react';
import PropTypes from 'prop-types';

export default function BtnRecipe({ doneRecipes, id, isInProgress }) {
  return (
    <div>
      {doneRecipes !== null && !doneRecipes.some((e) => e.id === id)
      && (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
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
