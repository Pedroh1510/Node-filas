#!/bin/sh

# set -e
rm -rf ./artemis/_TMP_/*
{
  cd ./artemis &&
  sh ./prepare-docker.sh --from-release --artemis-version 2.19.0 ||
  cd ./_TMP_/artemis/2.19.0 &&
  docker build -f ./docker/Dockerfile-debian -t local/artemis:2.19.0 -t local/artemis . &&
  echo "Executado com sucesso"
}||{
  echo "Erro na execução"
}