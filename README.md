# NodeJS + filas

Este projeto tem como objetivo servir de exemplo sobre como fazer uma conexão simples de envio e consumo de mensagens em sistemas de mensageiria com NodeJs.

## Tecnologias

- [Docker](https://www.docker.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [ActiveMQ 'Classic'](https://activemq.apache.org/components/classic/)
- [ActiveMQ Artemis](https://activemq.apache.org/components/artemis/)
- [Redis](https://redis.io/) + [Bull](https://github.com/OptimalBits/bull)
- [Kafka](https://kafka.apache.org/)

## Como utilizar

Criando imagem docker do ActiveMq Artemis

```sh
cd docker

./createDockerImagesExternal.sh
```

Criando os containers

```sh
docker--compose up -d
```

## Testes de benchmark

```bash
  npx autocannon -c 100 -d 10 localhost:3333/rabbit --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/activemq --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/artemis --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/redis --renderStatusCodes
  npx autocannon -c 100 -d 10 localhost:3333/kafka --renderStatusCodes
```
