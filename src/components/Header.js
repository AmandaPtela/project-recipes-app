import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showSearch, setShowSearch] = useState(false);

  const search = (
    <input
      type="image"
      alt="Search Icon"
      src={ searchIcon }
      onClick={ () => setShowSearch(!showSearch) }
      data-testid="search-top-btn"
    />
  );

  return (
    <header>
      <main className="wrapper-header">
        <h3 data-testid="page-title">{title}</h3>
        <div className="options">
          <Link to="/profile">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </Link>
          {(title === 'Foods' || title === 'Drinks') && search}
        </div>
      </main>
      { showSearch && <SearchBar type={ title } /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,

};

export default Header;
