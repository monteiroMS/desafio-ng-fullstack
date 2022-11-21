import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userProvider';
import { clearUser } from '../../utils/localStorage';
import userIcon from '../../images/userIcon.png';
import styles from './styles.module.css';

function Header() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <div className={ styles.container }>
      <h1>NG.CASH</h1>
      <div className={ styles.userBox }>
        <div className={ styles.usernameBox }>
          <p>{ user.username }</p>
          <button
            type="button"
            onClick={ logout }
            className={ styles.btn }
          >
            Sair
          </button>
        </div>
        <img
          src={ userIcon }
          alt="icone do usuario"
          className={ styles.img }
        />
      </div>
    </div>
  );
}

export default Header;
