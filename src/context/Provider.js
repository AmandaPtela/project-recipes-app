import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const context = createContext();

export function Provider({ children }) {
  return (
    <context.Provider value={ {} }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.object).isRequired,
};
