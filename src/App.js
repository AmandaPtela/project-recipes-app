import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoritesRecipes';
import RecipeDetails from './pages/RecipeDetails';
import { Context } from './context/Provider';

function App() {
  const AllContext = useContext(Context);

  console.log('TEM DENTRO DO CONTEXT................................', AllContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:id" component={ RecipeDetails } />
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
