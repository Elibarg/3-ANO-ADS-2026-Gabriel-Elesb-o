## Módulo 04 — Estruturas de Dados Não Lineares

Estruturas não lineares são aquelas em que os elementos não seguem uma sequência única. Em vez disso, os dados podem se organizar de forma hierárquica ou em rede, permitindo relações mais complexas entre os elementos. É o caso das árvores, árvores binárias, árvores binárias de busca e grafos.

## Árvores

Uma árvore é uma estrutura hierárquica composta por nós. Existe um nó inicial chamado raiz, e a partir dele surgem os demais nós. Os nós que não possuem filhos são chamados folhas. A árvore é uma boa forma de representar relações de superioridade, organização ou dependência.

Exemplo conceitual: imagine uma organização empresarial. A diretoria fica no topo, abaixo dela vêm os setores, e abaixo dos setores vêm os funcionários. Essa é uma estrutura em árvore.

## Vantagens
Representa hierarquia naturalmente
Boa para organização
## Desvantagens
Pode ficar desbalanceada
Busca pode degradar

## Árvores binárias

Uma árvore binária é uma árvore em que cada nó pode ter no máximo dois filhos: um à esquerda e outro à direita. Os percursos mais conhecidos são:

In-order: esquerda, nó atual, direita.
Pre-order: nó atual, esquerda, direita.
Post-order: esquerda, direita, nó atual.

Esses percursos são importantes porque definem a ordem em que os nós serão visitados.

## Exemplo
// esquerda < raiz < direita

## Vantagens
Busca eficiente → O(log n) (se balanceada)
## Desvantagens
Pode virar lista → O(n)
## Por que isso acontece?

Se os dados forem inseridos em ordem, a árvore perde o balanceamento.

Bom para: buscas ordenadas
Ruim para: dados já ordenados

## Árvores binárias de busca

A árvore binária de busca organiza os valores de forma que os elementos menores fiquem à esquerda e os maiores à direita. Essa regra facilita buscas, inserções e remoções quando a árvore está bem balanceada. Em termos práticos, ela acelera a localização de dados porque reduz o número de comparações necessárias.

## Grafos

Grafos são estruturas formadas por vértices e arestas. Eles são usados quando precisamos representar relações complexas, como conexões entre pessoas, rotas entre cidades ou dependências entre tarefas. Diferente da árvore, o grafo não precisa seguir uma hierarquia fixa.

## Vantagens
Extremamente flexível
Modela problemas reais
## Desvantagens
Complexidade alta
Algoritmos custosos
## Por que isso acontece?

Cada nó pode se conectar com vários outros → crescimento exponencial de caminhos.

Bom para: redes, rotas
Ruim para: simplicidade e performance direta

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `dados-nao-lineares` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/dados-nao-lineares"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
