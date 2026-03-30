## Módulo 03 — Recursividade

Recursividade é uma técnica em que uma função chama a si mesma para resolver um problema. A ideia não é “repetir por repetir”, mas dividir um problema grande em partes menores até chegar a uma condição de parada chamada caso base. O módulo destaca exatamente essa lógica, mostrando como a recursão aparece em exemplos como fatorial, Fibonacci e travessia de estruturas como árvores.

## Como entender recursividade

Para entender recursividade, pense em uma escada. Em vez de resolver tudo de uma vez, você resolve um degrau por vez até chegar ao chão. Na programação, cada chamada da função resolve uma parte menor do problema.

## Uma função recursiva precisa de três coisas:

Caso base: impede que a função continue chamando a si mesma para sempre.
Chamada recursiva: a função chama a própria função.
Progresso: cada chamada precisa se aproximar do caso base.
Exemplo: fatorial

O fatorial de um número representa o produto de todos os inteiros positivos até ele. Por exemplo, 5! = 5 × 4 × 3 × 2 × 1. Na forma recursiva, o problema é reescrito como n! = n × (n-1)!, até chegar ao caso base 1! = 1. Isso mostra bem a lógica de “quebrar o problema em versões menores de si mesmo”.

function fatorial(n) {
  if (n === 1) return 1;
  return n * fatorial(n - 1);
}

## Exemplo: Fibonacci

A sequência de Fibonacci é definida de forma recursiva porque cada termo depende dos dois anteriores. O primeiro e o segundo termos são os casos base, e os demais surgem da soma dos dois anteriores. Esse exemplo é didático, mas também mostra um ponto importante: recursão nem sempre é a solução mais eficiente, embora seja conceitualmente elegante.
Exemplo: Fibonacci

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

## Vantagens
Código mais simples e elegante
Ideal para problemas hierárquicos
## Desvantagens
Alto consumo de memória (stack)
Pode ser extremamente lento
## Por que isso acontece?

Cada chamada recursiva fica armazenada na pilha de execução.
No caso do Fibonacci, há repetição de cálculos, causando crescimento exponencial.

Bom para: árvores, divisão de problemas
Ruim para: problemas com repetição de subcálculos

## Aplicação em árvores

A recursividade é muito usada em árvores porque a própria estrutura já é hierárquica. Cada nó pode ser visto como a raiz de uma subárvore. Assim, percursos como in-order, pre-order e post-order se tornam naturais de implementar de forma recursiva.

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `recursividade` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/recursividade"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js
node atividade7.js