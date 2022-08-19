import React, { createContext } from 'react';

export const context = createContext();

export function Provider({ children }) {
  return (
    <context.Provider value={ {} }>
      { children }
    </context.Provider>
  );
}
