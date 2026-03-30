## Módulo 05 — Tabelas Hash

Tabelas hash são estruturas projetadas para permitir acesso rápido a dados. A ideia é transformar uma chave em um índice por meio de uma função hash. Esse índice aponta para a posição onde o valor será armazenado ou recuperado. O módulo também aborda colisões, encadeamento e endereçamento aberto.

## Como funciona

Pense em uma tabela hash como um armário com várias gavetas numeradas. A função hash decide em qual gaveta um item será guardado. Se duas chaves diferentes forem parar na mesma gaveta, ocorre uma colisão.

## Colisões

Colisão acontece quando duas chaves distintas resultam no mesmo índice. Isso não significa que a tabela hash falhou; significa apenas que a função hash precisou lidar com duas entradas competindo pelo mesmo espaço.

## Técnicas de resolução

Encadeamento: cada posição da tabela guarda uma lista de elementos.
Endereçamento aberto: quando há colisão, a estrutura procura outra posição livre na própria tabela.

## Aplicações

Tabelas hash são comuns em dicionários, caches, bancos de dados e sistemas que precisam recuperar dados com rapidez. O módulo mostra justamente por que essa estrutura é tão útil em situações em que desempenho importa.

## Exemplo:

## Vantagens
Busca muito rápida → O(1)
Inserção eficiente
## Desvantagens
Colisões
Dependência da função hash
## Por que isso acontece?

Se muitas chaves caem no mesmo índice, vira uma lista → O(n)

Bom para: buscas rápidas
Ruim para: distribuição ruim de dados

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `tabelas-hash` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/tabelas-hash"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js
node atividade7.js