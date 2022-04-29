import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context/auth';

import styles from './styles.css';

const Login = () => {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }


  return (
    <div id='login'>
      <h1 className='title'>Login do sistema</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            className='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor='senha'>Senha: </label>
          <input
            type='password'
            className='password'
            id='senha'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Entrar</button>
      </form>

    </div>
  );
}

export default Login;