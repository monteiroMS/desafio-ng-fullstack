import React, { Dispatch, SetStateAction } from 'react';
import reloadIcon from '../../images/reloadIcon.png';
import styles from './styles.module.css';

function ReloadButton({ setReload }: { setReload: Dispatch<SetStateAction<boolean>> }) {
  return (
    <button
      type="button"
      onClick={ () => setReload((prev) => !prev) }
      className={ styles.btn }
    >
      <img
        src={ reloadIcon }
        alt="setas circulares apontando para si mesmas indicando recarregar"
        className={ styles.img }
      />
    </button>
  );
}

export default ReloadButton;
