import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header title="Profile" />
      <p
        data-testid="profile-email"
      >
        { email }
      </p>
      <button
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
