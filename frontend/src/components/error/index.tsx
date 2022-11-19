import React from 'react';
import IErrorProps from '../../interfaces/IErrorProps';

function Error({ message }: IErrorProps) {
  return (
    <p>{ message }</p>
  );
}

export default Error;
