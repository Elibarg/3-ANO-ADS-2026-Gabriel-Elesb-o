## Módulo 07 — Algoritmos de Ordenação

Ordenar significa organizar elementos segundo uma regra, como crescente ou decrescente. O módulo mostra que a ordenação não é apenas um detalhe: ela influencia diretamente a eficiência de buscas, comparações e processamento de dados. Também apresenta conceitos como estabilidade e complexidade de tempo.

## Selection Sort

O algoritmo percorre a lista inteira para encontrar o menor elemento e colocá-lo na posição correta. Depois repete o processo para o restante da lista. É fácil de entender, mas não é eficiente para listas grandes, porque sua complexidade é quadrática.

## Ruim:
Sempre O(n²)

## Insertion Sort

Esse método constrói a lista ordenada aos poucos. Ele pega um elemento por vez e o insere na posição correta dentro da parte já ordenada. Funciona bem quando os dados já estão quase ordenados.

## Melhor caso:
O(n)
## Pior caso
O(n²)

## Bubble Sort

Nesse algoritmo, elementos vizinhos são comparados e trocados de lugar quando estão fora de ordem. O processo se repete até que nenhuma troca seja mais necessária. É um algoritmo simples para aprender o conceito de ordenação, mas pouco eficiente na prática.

## Melhor caso 
O(n) (se já ordenado)
## Pior caso 
O(n²)

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `algoritmos-ordenacao` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/algoritmos-ordenacao"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js