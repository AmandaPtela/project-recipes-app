import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MIN_PASSWORD_LENGTH } from '../helpers/magicNumbers';
// import './CSS/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function check() {
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const ok = regexEmail.test(email) && password.length > MIN_PASSWORD_LENGTH;
    return !ok;
  }

  function handleClick() {
    const obj = { email };
    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }
  return (
    <main id="login-page">
      <form id="login-form">
        <label htmlFor="email">
          Email
          {' '}
          <br />
          <input
            id="email"
            value={ email }
            type="email"
            required
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha
          {' '}
          <br />
          <input
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
            required
          />
        </label>
        <Link to="/foods">
          <button
            type="button"
            disabled={ check() }
            data-testid="login-submit-btn"
            onClick={ handleClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    </main>
  );
}

export default Login;
