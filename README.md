# Projeto de Gerenciador de Exercícios Múltipla Escolha
@author Daniel Sá Barretto

Este projeto é um gerenciador de questões de múltipla escolha feito com ReactJS, TypeScript, NodeJS, GraphQL, Apollo, TypeORM e MongoDB.

## Instalação de dependências

Para instalar as dependências tanto do cliente quanto do servidor, execute:


```bash
    cd server
    npm install
```
```bash
    cd ../client
    npm install
```

## Compilação

Para compilar o código em typescript do servior e cliente execute:

```sh
    cd server
    npm run build
```
```bash
    cd client
    npm run build
```

O código compilado do servidor se encontrará na diretório ``server/dist``
Já o código compilado do cliente se encontrará no diretório ``client/build``


## Execução

Para executar o servidor e cliente em modo de desenvolvimento execute:

```bash
    cd server
    npm run dev
```
```bash
    cd client
    npm start
```

Para executar em modo de produção execute:

```bash
    cd server
    npm start
```

```bash
    cd client
    npx serve -s build
```