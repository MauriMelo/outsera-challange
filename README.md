## Descrição
Desenvolvido API REST para obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido de uma lista de indicados e vencedores da categoria <b>Pior Filme</b> do <b>Golden Raspberry Awards</b>.

## Conhecimentos
Nessa desafio da <b>Outsera</b> foi adicionado as seguintes boas práticas e tecnologias para avaliação de conhecimento apenas:

1. NodeJS
2. DDD - Domain Driven Design;
3. NestJS Framework
4. MikroORM e sqlite (banco em memória)
5. Testes unitários e E2E com Jest
6. Padrões API REST
7. Docker

## Requisitos do projeto
  1. Node 20;
  2. sqlite3;

## Instalação
```bash
$ npm install
```

## Execução
1. Comandos para rodar localmente:
```bash
$ npm run start
```

2. Comandos para rodar com docker:
```bash

$ docker build -t outsera-challange:latest .
$ docker run -p 3000:3000 outsera-challange:latest

```

## Acesso ao projeto
Após inicialização do projeto é possível acessar via url:
http://localhost:3000/producers/awards-interval

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "previousWin": 1990,
      "followingWin": 1991,
      "interval": 1
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "previousWin": 2002,
      "followingWin": 2015,
      "interval": 13
    }
  ]
}
```

## Testes unitários
```bash
# teste unitário
$ npm run test

# teste de integração
$ npm run test:e2e

```
