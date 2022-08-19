import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function check() {
    const minPass = 6;
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const ok = regexEmail.test(email) && password.length > minPass;
    return !ok;
  }

  function handleClick() {
    const obj = { email };
    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }
  return (
    <form>
      <label htmlFor="email">
        Email
        {' '}
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
  );
}

export default Login;
