## Módulo 06 — Estruturas de Dados Avançadas

Este módulo apresenta estruturas usadas em contextos mais avançados, especialmente quando é necessário lidar com grandes volumes de dados ou com algoritmos de grafos e armazenamento em disco. Entre os temas estão Union-Find, árvores B e árvores B+.

## Union-Find

Union-Find, também chamado de conjuntos disjuntos, é uma estrutura que serve para representar grupos separados e descobrir rapidamente se dois elementos pertencem ao mesmo grupo. As duas operações centrais são:

Find: identifica o conjunto ao qual um elemento pertence.
Union: une dois conjuntos.

Ela aparece em algoritmos de grafos, como o algoritmo de Kruskal, usado para encontrar árvores geradoras mínimas. O módulo também destaca otimizações importantes como union by rank e path compression, que tornam as operações mais eficientes.

## Vantagens
Muito eficiente para agrupamentos
Operações quase constantes
## Desvantagens
Uso específico
Não serve para busca geral
## Por que isso acontece?

É otimizado para operações específicas (union/find), não para tudo.

## Árvores B e B+

As árvores B e B+ são estruturas balanceadas muito usadas em bancos de dados e sistemas de arquivos. Elas foram projetadas para funcionar bem com armazenamento secundário, onde o custo de acesso ao disco é alto. Por isso, são importantes para indexação e organização de grandes volumes de informação.

## Vantagens
Otimizadas para disco
Mantêm balanceamento
## Desvantagens
Complexas de implementar
## Por que isso acontece?

Projetadas para reduzir acesso ao disco (custo alto).

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `dados-avancados` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/dados-avancados"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js 