import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../../components/userForm';

function Login() {
  return (
    <div>
      <UserForm type="login" />
      <p>Ainda não é cadastrado?</p>
      <Link
        to="/register"
      >
        Criar conta NG.CASH
      </Link>
    </div>
  );
}

export default Login;
