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
