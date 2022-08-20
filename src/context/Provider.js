import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export function Provider({ children }) {
  const [foods, setFoods] = useState({});

  return (
    <Context.Provider
      value={ {
        foods,
        setFoods,
      } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
