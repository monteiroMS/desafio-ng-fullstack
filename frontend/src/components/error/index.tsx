import React from 'react';
import IErrorProps from '../../interfaces/IErrorProps';
import styles from './styles.module.css';

function Error({ message }: IErrorProps) {
  return (
    <p className={ styles.text }>{ message }</p>
  );
}

export default Error;
