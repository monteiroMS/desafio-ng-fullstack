import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import userToIcon from '../../images/userToIcon.png';
import dollarSign from '../../images/dollarSign.png';
import styles from './styles.module.css';
import { UserContext } from '../../context/userProvider';
import requestNewTransaction from '../../utils/api/requestNewTransaction';
import Loading from '../loading';
import Error from '../error';
import { getUserFromLS } from '../../utils/localStorage';

const INITIAL_TRANSACTION = {
  fromUsername: '',
  toUsername: '',
  value: 0,
};

function NewTransaction() {
  const { user, setUser } = useContext(UserContext);
  const [transaction, setTransaction] = useState(INITIAL_TRANSACTION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setTransaction((prevTransaction) => {
      return {
        ...prevTransaction,
        fromUsername: user.username,
        [name]: value,
      }
    })
  };

  const doTransaction = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (user.balance < transaction.value) {
      setError('Seu saldo é insuficiente para esta transação');
    } else {
      setLoading(true);
      const data = await requestNewTransaction(
        {
          ...transaction,
          value: Number(transaction.value),
        },
        getUserFromLS().token,
      );
      if (data.message) {
        setError(data.message);
        setLoading(false);
      } else {
        setUser({
          ...user,
          balance: user.balance - transaction.value,
        });
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    }
  };

  return (
    <div className={ styles.container }>
      <h2>Fazer uma nova transação</h2>
      <form className={ styles.form }>
        <label className={ styles.label }>
          Nome do usuário destinatário
          <input
            type="text"
            name="toUsername"
            onChange={ handleChange }
            placeholder="nome do usuário"
          />
          <img
            src={ userToIcon }
            alt="icone de usuario em preto"
            className={ styles.iconUser }
          />
        </label>
        <label className={ styles.label }>
          Valor a ser transferido
          <input
            type="number"
            name="value"
            onChange={ handleChange }
            placeholder="0.00"
          />
          <img
            src={ dollarSign }
            alt="simbolo do dolar em preto"
            className={ styles.iconDollar }
          />
        </label>
        <button
          type="submit"
          onClick={ doTransaction }
          className={ styles.btn }
        >
          Transferir
        </button>
      </form>
      { loading && <Loading /> }
      { error && <Error message={ error } /> }
      { success && <p>Transação concluída com sucesso!</p> }
    </div>
  );
}

export default NewTransaction;
