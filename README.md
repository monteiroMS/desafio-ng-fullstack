
# Desafio fullstack NG.CASH

## Aplicação modelo carteira digital

### Funcionalidades

* Permite cadastro, login e logout de usuários;
* Permite realizar transações entre usuários;
* Exibe saldo e transferências realizadas pelo usuário;

## Requisitos

Para rodar esta aplicação é necessário possuir o Node(19.0.1), Docker(20.10.21) e Docker-compose(2.5.0) instalados.

## Como rodar a aplicação localmente

Clone a aplicação para um repositório no seu computador, entre na pasta da aplicação e execute o comando

```
npm install
```

Depois, é necessário criar um arquivo .env no repositório /frontend com o host e a porta escolhida para rodar o backend

```
REACT_APP_BACKEND_HOST=localhost
REACT_APP_BACKEND_PORT=3001
```

Em seguida, na pasta raiz da aplicação, basta rodar o comando `npm start` e esperar os contâineres db, app_backend e app_frontend subirem

Após o container do backend finalizar a execução dos seus scripts, já deve ser possível acessar a aplicação pela URL `http://localhost:3000/`.

## Informações adicionais

### Seeders
O banco de dados já deve estar populado ao iniciar a aplicação. Para testar as funcionalidades do app, é possível utilizar as credenciais

<p>username -> password</p>
<p>joaosilva -> Senha@123</p>
<p>marciapereira -> Senha@456</p>
<p>pedrolima -> Senha@789</p>

### Manipulação de estado

  * Foi utilizado o `ContextAPI`;

### Estilização

 A aplicação ainda não possui layout totalmente responsivo e a estilização não está completa.
 
### Testes

 A aplicação ainda não possui testes implementados.
  
### Histórico da construção

 As etapa da construção da aplicação estão separadas nas branches deste repositório.
