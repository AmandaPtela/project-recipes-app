import React, { useContext, useState } from 'react';
import fetchFood from '../API/fetchFood';
import { Context } from '../context/Provider';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { setFoods } = useContext(Context);

  const handleSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleRadio = ({ target }) => {
    setRadioValue(target.value);
  };

  const handleSubmit = async () => {
    if (radioValue === 'search-ingredient') {
      const API = await fetchFood(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      setFoods(API);
    }

    if (radioValue === 'search-name') {
      const API = await fetchFood(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      setFoods(API);
    }

    if (radioValue === 'search-first-letter') {
      const API = await fetchFood(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      setFoods(API);
    }
  };

  console.log(radioValue, searchValue);

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleSearch }
        />

        <label htmlFor="search-radio1">
          <input
            type="radio"
            id="search-radio1"
            name="search-radio"
            value="search-ingredient"
            data-testid="ingredient-search-radio"
            onClick={ handleRadio }
            defaultChecked
          />
          Ingredient
        </label>

        <br />

        <label htmlFor="search-radio2">
          <input
            type="radio"
            id="search-radio2"
            name="search-radio"
            value="search-name"
            data-testid="name-search-radio"
            onClick={ handleRadio }
          />
          Name
        </label>

        <br />

        <label htmlFor="search-radio3">
          <input
            type="radio"
            id="search-radio3"
            name="search-radio"
            value="search-first-letter"
            data-testid="first-letter-search-radio"
            onClick={ handleRadio }
          />
          Primeira Letra
        </label>

        <br />

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
        >
          Search
        </button>

      </form>
    </div>
  );
}

export default SearchBar;
