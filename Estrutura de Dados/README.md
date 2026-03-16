# Atividades de Estrutura de Dados - Módulos 02 e 03

Este repositório contém a resolução das atividades práticas dos módulos **02 – Estruturas de Dados Lineares** e **03 – Recursividade** da trilha de Estrutura de Dados.

Todas as implementações foram feitas em **JavaScript**, seguindo os exemplos e pseudocódigos apresentados nos materiais de estudo.

---

## Módulo 02 – Estruturas de Dados Lineares

### 1. Vetores (`modulo02/01_vetores.js`)
- **a)** Crie um vetor com 10 números inteiros e uma função para buscar um número específico.
- **b)** Implemente uma função para remover um elemento de uma posição específica.

### 2. Lista Simplesmente Encadeada (`modulo02/02_lista_simplesmente_encadeada.js`)
- Implemente as operações: inserir no início, inserir no final e remover de uma posição específica.
- Adicione uma função para buscar um elemento por valor.

### 3. Lista Duplamente Encadeada (`modulo02/03_lista_duplamente_encadeada.js`)
- Operações: inserir no início e remover do final.
- Função para percorrer a lista em ambas as direções e imprimir os valores.

### 4. Pilha (Stack) (`modulo02/04_pilha.js`)
- Implemente uma pilha com verificação de vazia.
- Utilize a pilha para verificar se uma expressão aritmética possui parênteses balanceados.

### 5. Fila (Queue) (`modulo02/05_fila.js`)
- Operações básicas: enqueue e dequeue.
- Implementação de uma fila circular.
- Simulação de atendimento bancário com fila simples.

---

## Módulo 03 – Recursividade

### 1. Fatorial Recursivo (`modulo03/01_fatorial.js`)
- Função recursiva para calcular o fatorial de um número.
- Análise de complexidade: O(n).

### 2. Sequência de Fibonacci (`modulo03/02_fibonacci.js`)
- Função recursiva para o enésimo termo.
- Análise de desempenho e otimização com memoization.

### 3. Travessia em Árvores (`modulo03/03_travessia_arvore.js`)
- Implementação de uma árvore binária simples.
- Percursos in-order, pre-order e post-order recursivos.

### 4. Soma dos Elementos de uma Lista Encadeada (`modulo03/04_soma_lista_encadeada.js`)
- Função recursiva que percorre uma lista encadeada e retorna a soma de todos os valores.

### 5. Busca em Árvore Binária de Busca (`modulo03/05_busca_arvore_binaria.js`)
- Função recursiva para buscar um valor em uma BST.
- Análise de complexidade: O(h) no pior caso (h = altura da árvore).

### 6. Torre de Hanói (`modulo03/06_torre_hanoi.js`)
- Algoritmo recursivo para resolver o problema da Torre de Hanói.
- Número de movimentos: 2ⁿ – 1, complexidade O(2ⁿ).

### 7. Contagem de Nós em Lista Encadeada (`modulo03/07_contagem_nos_lista.js`)
- Função recursiva que conta o número de nós em uma lista encadeada.
- Análise de complexidade: tempo O(n), espaço O(n) (devido à pilha de recursão).

---

## Como executar

Os códigos são auto-contidos e podem ser executados em qualquer ambiente JavaScript (Node.js ou console do navegador). Basta copiar o conteúdo de cada arquivo e executar.

Exemplo:
```bash
node modulo02/01_vetores.js