
# Desafio fullstack NG.CASH

## Aplicação modelo carteira digital

### Funcionalidades

* Permite cadastro, login e logout de usuários;
* Permite realizar transações entre usuários;
* Exibe saldo e transferências realizadas pelo usuário;

## Requisitos

Para rodar esta aplicação é recomendado possuir Node(19.0.1), Docker(20.10.21) e Docker-compose(2.5.0) instalados.

## Como rodar a aplicação localmente

Clone a aplicação para um diretório no seu computador, entre na pasta da aplicação, execute o comando

```
npm start
```

e aguarde os contâineres db, app_backend e app_frontend subirem

Após o container do backend finalizar a execução dos seus scripts, já deve ser possível acessar a aplicação pela URL `http://localhost:3000/`.

## Informações adicionais

### Seeders
O banco de dados já deve estar populado ao iniciar a aplicação. Para testar as funcionalidades do app, é possível utilizar as credenciais

<p>username: joaosilva -> password: Senha@123</p>
<p>username: marciapereira -> password: Senha@456</p>
<p>username: pedrolima -> password: Senha@789</p>

### Manipulação de estado

 Foi utilizado o `ContextAPI`;

### Estilização

 A aplicação ainda não possui layout totalmente responsivo e a estilização não está completa.
 
### Testes

 A aplicação ainda não possui testes implementados.
  
### Histórico da construção

 As etapas da construção da aplicação estão separadas nas branches deste repositório.
