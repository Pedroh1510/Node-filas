# NodeJS + filas

Este projeto tem como objetivo servir de exemplo sobre como fazer uma conexão simples de envio e consumo de mensagens em sistemas de mensageria com NodeJs.

## Tecnologias

- [Docker](https://www.docker.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [ActiveMQ 'Classic'](https://activemq.apache.org/components/classic/)
- [ActiveMQ Artemis](https://activemq.apache.org/components/artemis/)

## Como utilizar

Criando imagem docker do ActiveMq Artemis

```sh
cd docker

./createDockerImagesExternal.sh
```

Criando os containers do RabbitMq, ActiveMq Classic e Artemis

```sh
docker--compose up -d
```

Executando o projeto

```sh
yarn install

# Servidor
yarn server

# consumidor
yarn consumer
```

## Testes de benchmark

```bash
  npx autocannon -c 100 -d 10 localhost:3333/rabbit --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/activemq --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/artemis --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/redis --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/kafka --renderStatusCodes
```
