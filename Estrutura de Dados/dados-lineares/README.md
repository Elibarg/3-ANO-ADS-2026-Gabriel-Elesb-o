## Módulo 02 — Estruturas de Dados Lineares

Estruturas lineares organizam os dados em sequência. Isso significa que cada elemento ocupa uma posição definida e, em geral, existe uma ordem clara entre eles. Esse tipo de estrutura é a base de muitas soluções em programação porque facilita o armazenamento, a leitura e o processamento de informações. O módulo apresenta vetores, listas encadeadas, pilhas e filas.

## Vetores

Um vetor é uma estrutura em que os elementos ficam armazenados em posições consecutivas da memória. Isso permite acessar qualquer posição rapidamente usando um índice. Por exemplo, se existe um vetor com valores [10, 20, 30, 40], o valor 30 pode ser encontrado diretamente na posição correspondente, sem precisar passar pelos anteriores. O ponto forte do vetor é o acesso rápido; o ponto fraco é que inserir ou remover elementos no meio pode exigir deslocamento dos demais.

## Exemplo:

let vetor = [10, 20, 30, 40];
console.log(vetor[2]); // 30

## Vantagens
Acesso extremamente rápido → O(1)
Simples de implementar
Excelente para leitura frequente
## Desvantagens
Inserção no meio → O(n)
Remoção no meio → O(n)
Tamanho fixo (em alguns casos)
## Por que isso acontece?

O vetor depende de memória contínua.
Quando você insere algo no meio, precisa deslocar todos os elementos à direita, o que custa tempo proporcional ao tamanho da lista.

 Bom para: leitura e acesso direto
 Ruim para: inserções frequentes no meio

## Listas encadeadas

Uma lista encadeada é formada por nós. Cada nó guarda um valor e uma referência para o próximo nó. Diferente do vetor, os elementos não precisam ficar lado a lado na memória. Isso torna inserções e remoções mais flexíveis, especialmente quando a quantidade de elementos muda com frequência. Em compensação, para encontrar um elemento específico, normalmente é preciso percorrer a lista do início até a posição desejada.

## Exemplo conceitual:

10 → 20 → 30 → null

## Vantagens
Inserção rápida → O(1)
Remoção eficiente → O(1)
Tamanho dinâmico

## Desvantagens
Busca lenta → O(n)
Não há acesso direto
Mais uso de memória (ponteiros)

## Por que isso acontece?

Os elementos não estão em sequência na memória.
Para encontrar um valor, você precisa percorrer nó por nó.

Bom para: inserção e remoção frequentes
Ruim para: acesso aleatório

## Pilhas

A pilha segue o princípio LIFO, isto é, o último elemento a entrar é o primeiro a sair. Um exemplo simples é uma pilha de pratos: o último prato colocado no topo é o primeiro a ser retirado. As operações principais são empilhar (push), desempilhar (pop) e consultar o topo (peek). Pilhas aparecem em chamadas de função, desfazer ações e avaliação de expressões.

## Exemplo:

let pilha = [];
pilha.push(10);
pilha.push(20);
pilha.pop(); // remove 20

## Vantagens
Operações rápidas → O(1)
Simples e previsível
## Desvantagens
Acesso limitado (apenas topo)
Não permite busca eficiente
## Por que isso acontece?

A pilha restringe acesso ao topo para manter simplicidade e eficiência.

Bom para: controle de execução, histórico
Ruim para: acesso a elementos internos

## Filas

A fila segue o princípio FIFO, em que o primeiro elemento a entrar é o primeiro a sair. É o mesmo raciocínio de uma fila de atendimento: quem chega primeiro é atendido primeiro. As operações principais são inserir no fim (enqueue) e remover do início (dequeue). Filas são usadas em sistemas de impressão, controle de requisições e processamento de tarefas.

## Exemplo:

let fila = [];
fila.push(10);
fila.push(20);
fila.shift(); // remove 10

## Vantagens
Organização natural de processos
Boa para sistemas sequenciais
## Desvantagens
Remoção pode ser lenta (dependendo da implementação)
Acesso limitado
## Por que isso acontece?

Remover o primeiro elemento pode exigir reorganização da estrutura.

Bom para: sistemas de processamento
Ruim para: acesso aleatório

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `dados-lineares` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/dados-lineares"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js