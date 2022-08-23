import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showSearch, setShowSearch] = useState(false);

  function handleSearchBar() {
    setShowSearch(!showSearch);
  }

  const search = (
    <div
      role="button"
      tabIndex={ 0 }
      onClick={ handleSearchBar }
      onKeyDown={ handleSearchBar }
    >
      <img
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      />
    </div>
  );

  return (
    <header>
      <h3 data-testid="page-title">{title}</h3>
      <Link to="/profile">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </Link>
      {(title === 'Foods' || title === 'Drinks') && search}
      {showSearch && <SearchBar type={ title } />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,

};

export default Header;
