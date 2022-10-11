#!/bin/sh

# set -e
rm -rf ./artemis/_TMP_/*
{
  cd ./artemis &&
  sh ./prepare-docker.sh --from-release --artemis-version 2.26.0 &&
  cd ./_TMP_/artemis/2.26.0 &&
  docker build -f ./docker/Dockerfile-ubuntu-11-jre -t local/artemis:2.26.0 -t local/artemis . &&
  cd .. && cd .. && cd .. && cd .. && cd ./activemq && docker build -t local/activemq .&&
  echo "Executado com sucesso"
}||{
  echo "Erro na execução"
}