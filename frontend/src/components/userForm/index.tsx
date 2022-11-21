import React, { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/error';
import Loading from '../../components/loading';
import { IHandlePassword } from '../../interfaces/IHandlePassword';
import IUserInfo from '../../interfaces/IUserInfo';
import isUserValid from '../../utils/isUserValid';
import { saveUserOnLS } from '../../utils/localStorage';
import requestLoginOrSignin from '../../utils/api/requestLoginOrSignin';

export const INITIAL_USER_INFO = {
  username: '',
  password: '',
};

const PASSWORD_REQUIREMENTS = `
  Sua senha deve conter ao menos:
    - uma letra maiúscula
    - um número
    - 8 caracteres
`;

function UserForm({ type }: { type: 'login' | 'signin' }) {
  const [userInfo, setUserInfo] = useState<IUserInfo>(INITIAL_USER_INFO);
  const [showPassword, setShowPassword] = useState<IHandlePassword>('password');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const sendToServer = async (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = await requestLoginOrSignin(userInfo, type);
    if (data.message) {
      setError(data.message);
      setLoading(false);
    } else {
      saveUserOnLS(data);
      setLoading(false);
      navigate('/');
    }
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUserInfo((prevUserInfo) => {
      setIsDisabled(!isUserValid({
        ...prevUserInfo,
        [name]: value,
      }));
      return {
        ...prevUserInfo,
        [name]: value,
      }
    })
  };

  const handleShowPassword = () => {
    showPassword === 'text'
      ? setShowPassword('password')
      : setShowPassword('text');
  };

  return (
    <form onSubmit={ sendToServer }>
      <label>
        Insira seu nome de usuário
        <input
          type="text"
          name="username"
          onChange={ handleChange }
          value={ userInfo.username }
          placeholder="username"
        />
      </label>
      <label>
        Insira sua senha
        <input
          type={ showPassword }
          name="password"
          onChange={ handleChange }
          value={ userInfo.password }
          placeholder="senha"
        />
        { type === 'signin' && PASSWORD_REQUIREMENTS }
      </label>
      <label>
        Mostrar senha
        <input
          type="checkbox"
          onChange={ handleShowPassword }
        />
      </label>
      <button
        type="submit"
        onClick={ sendToServer }
        disabled={ isDisabled }
      >
        {
          type === 'login'
            ? 'Entrar'
            : 'Criar conta'
        }
      </button>
      { loading && <Loading /> }
      { error && <Error message={ error } /> }
    </form>
  );
}

export default UserForm;
