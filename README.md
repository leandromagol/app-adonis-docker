# app-adonis-docker

## How to run

Copie o .env.example e adicione as crednecias do S3 amazon no seu .env

Rode `docker-compose up --build`

Existem alguns problemas a serem resolvidos e preciso entrar no container `app` e rodar os comando `node ace migration:run` e `yarn add bcrypt`
