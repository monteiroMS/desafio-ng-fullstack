import React from 'react';
import styles from './styles.module.css';
import gitHubIcon from '../../images/gitHubIcon.png';
import sourceCodeIcon from '../../images/sourceCodeIcon.png';

function Footer() {
  return (
    <footer className={ styles.container }>
      <p>Desenvolvido por</p>
      <a
        href="https://github.com/monteiroMS"
        target="_blank"
        rel="noopener noreferrer"
      >
        monteiroMS
      </a>
      <img
        src={ gitHubIcon }
        alt="logo github"
        className={ styles.logo }
      />
      <a
        href="https://github.com/monteiroMS/desafio-ng-fullstack"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={ sourceCodeIcon }
          alt="icone de arquivo com uma tag vazia"
          className={ styles.sourceLogo }
        />
      </a>
    </footer>
  )
} 

export default Footer;
