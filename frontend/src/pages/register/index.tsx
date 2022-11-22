import React from 'react';
import UserForm from '../../components/userForm';
import styles from './styles.module.css';

function Register() {
  return (
    <div className={ styles.container }>
      <div className={ styles.registerBox }>
        <h1>Cadastro</h1>
        <UserForm type="signin" />
      </div>
    </div>
  );
}

export default Register;
