import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../../components/userForm';
import styles from './styles.module.css';

function Login() {
  return (
    <main className={ styles.container }>
      <div className={ styles.loginBox }>
        <h1>Fazer Login</h1>
        <UserForm type="login" />
        <p>Ainda não é cadastrado?</p>
        <Link
          to="/register"
          className={ styles.btn }
        >
          Criar conta NG.CASH
        </Link>
      </div>
    </main>
  );
}

export default Login;
