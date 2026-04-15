#  Módulo 05 — Consultas Avançadas (JOINs e Subconsultas)
> **Trilha de Banco de Dados | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo aprofunda as capacidades de consulta SQL, explorando como **combinar dados de múltiplas tabelas** com JOINs, como usar **subconsultas aninhadas** para recuperar informações complexas e como aplicar **funções de agregação** para análise estatística de dados.

---

##  Conteúdo

### 1. Consultas com JOIN

#### O que são JOINs?

Um **JOIN** combina registros de duas ou mais tabelas com base em uma condição relacional. Ele elimina a necessidade de redundância de dados e permite trabalhar com informações distribuídas em múltiplas tabelas de forma integrada.

**Por que usar JOINs?**
- Facilitam a recuperação de dados relacionados entre tabelas
- Reduzem a duplicação de informações
- São a base para sistemas relacionais bem estruturados

---

#### 1.1 INNER JOIN

Retorna **apenas os registros que têm correspondência em ambas as tabelas**.

```sql
SELECT clientes.nome, pedidos.valor_total
FROM clientes
INNER JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
```

**Dados de exemplo:**

| id_cliente | nome |
|-----------|------|
| 1 | João Silva |
| 2 | Maria Souza |

| id_pedido | id_cliente | valor_total |
|-----------|-----------|-------------|
| 101 | 1 | 150.00 |
| 102 | 2 | 200.00 |

**Resultado:**
| nome | valor_total |
|------|-------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |

>  Clientes sem pedidos **não aparecem** no resultado — apenas os que têm correspondência.

---

#### 1.2 LEFT JOIN

Retorna **todos os registros da tabela à esquerda** e os correspondentes da direita. Quando não há correspondência, exibe `NULL`.

```sql
SELECT clientes.nome, pedidos.valor_total
FROM clientes
LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
```

**Resultado (incluindo Ana Oliveira sem pedido):**
| nome | valor_total |
|------|-------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |
| Ana Oliveira | NULL |

>  Use `LEFT JOIN` quando precisar listar **todos** os registros da tabela principal, mesmo sem correspondência.

---

#### 1.3 RIGHT JOIN

Retorna **todos os registros da tabela à direita** e os correspondentes da esquerda. Quando não há correspondência, exibe `NULL`.

```sql
SELECT clientes.nome, pedidos.valor_total
FROM clientes
RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
```

>  É a inversão lógica do `LEFT JOIN`. Menos comum, mas útil quando a tabela principal está à direita.

---

#### 1.4 FULL OUTER JOIN (emulado no MySQL)

O MySQL **não suporta nativamente** `FULL OUTER JOIN`. Ele é emulado com `UNION` entre um `LEFT JOIN` e um `RIGHT JOIN`:

```sql
SELECT clientes.nome, pedidos.valor_total
FROM clientes
LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente

UNION

SELECT clientes.nome, pedidos.valor_total
FROM clientes
RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
```

>  Retorna **todos os registros de ambas as tabelas**, com `NULL` onde não há correspondência.

---

#### Resumo dos tipos de JOIN

| Tipo | O que retorna |
|------|--------------|
| `INNER JOIN` | Apenas registros com correspondência em ambas as tabelas |
| `LEFT JOIN` | Todos da esquerda + correspondências da direita (NULL onde não há) |
| `RIGHT JOIN` | Todos da direita + correspondências da esquerda (NULL onde não há) |
| `FULL OUTER JOIN` | Todos de ambas as tabelas (NULL onde não há correspondência) |

---

### 2. Subconsultas (Subqueries)

Uma **subconsulta** é uma consulta SQL aninhada dentro de outra consulta principal. Ela é executada primeiro e seu resultado é usado pela consulta externa.

---

#### 2.1 Subconsultas Simples

**Em `SELECT` — Recuperar o cliente com o maior pedido:**
```sql
SELECT nome
FROM clientes
WHERE id_cliente = (
    SELECT id_cliente
    FROM pedidos
    ORDER BY valor_total DESC
    LIMIT 1
);
```

**Em `INSERT` — Adicionar pedido para o cliente com maior valor:**
```sql
INSERT INTO pedidos (id_cliente, valor_total)
VALUES (
    (SELECT id_cliente FROM pedidos ORDER BY valor_total DESC LIMIT 1),
    500.00
);
```

---

#### 2.2 Subconsultas Correlacionadas

Uma subconsulta **correlacionada** depende de cada registro da consulta principal para ser executada — ela é reavaliada para cada linha da consulta externa.

**Exemplo — Listar clientes e o total de seus pedidos:**
```sql
SELECT nome, (
    SELECT SUM(valor_total)
    FROM pedidos
    WHERE pedidos.id_cliente = clientes.id_cliente
) AS total_pedidos
FROM clientes;
```

>  Diferença entre simples e correlacionada:
> - **Simples:** executa uma vez, resultado fixo
> - **Correlacionada:** executa uma vez **por linha** da consulta principal

---

### 3. Funções de Agregação

As funções de agregação processam um conjunto de valores e retornam **um único valor estatístico**.

| Função | Descrição |
|--------|-----------|
| `COUNT(*)` | Conta o número de registros |
| `SUM(coluna)` | Soma os valores de uma coluna |
| `AVG(coluna)` | Calcula a média dos valores |
| `MAX(coluna)` | Retorna o maior valor |
| `MIN(coluna)` | Retorna o menor valor |

**Exemplos:**
```sql
-- Total de clientes
SELECT COUNT(*) AS total_clientes FROM clientes;

-- Soma total de vendas
SELECT SUM(valor_total) AS total_vendas FROM pedidos;

-- Média dos pedidos
SELECT AVG(valor_total) AS media_pedidos FROM pedidos;

-- Maior pedido
SELECT MAX(valor_total) AS maior_pedido FROM pedidos;

-- Menor pedido
SELECT MIN(valor_total) AS menor_pedido FROM pedidos;
```

---

#### 3.1 Combinação com `GROUP BY` e `HAVING`

O `GROUP BY` organiza os resultados em grupos. O `HAVING` filtra esses grupos.

**Exemplo — Total de vendas por cliente, só mostrando quem vendeu mais de R$200:**
```sql
SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
GROUP BY clientes.nome
HAVING total_vendas > 200;
```

**Resultado:**
| nome | total_vendas |
|------|-------------|
| Maria Souza | 200.00 |

---

##  Questões Práticas

1. **INNER JOIN:** Liste nomes de clientes e valores de pedidos (apenas quem tem pedidos)
2. **LEFT JOIN:** Liste todos os clientes com seus pedidos, exibindo `NULL` para sem pedido
3. **RIGHT JOIN:** Liste todos os pedidos com os nomes dos clientes
4. **FULL OUTER JOIN:** Emule com `UNION` para mostrar todos clientes e pedidos
5. **Subconsulta em SELECT:** Recupere o nome do cliente com o maior pedido
6. **Subconsulta em INSERT:** Adicione pedido para o cliente com maior valor
7. **Subconsulta Correlacionada:** Liste clientes e total de seus pedidos
8. **COUNT:** Conte o total de pedidos realizados
9. **GROUP BY:** Liste total de vendas por cliente
10. **GROUP BY + HAVING:** Liste clientes com vendas superiores a R$200

---

##  Questões Teóricas

1. O que é `INNER JOIN` e cite um exemplo prático
2. Qual a diferença entre `LEFT JOIN` e `RIGHT JOIN`?
3. Como emular `FULL OUTER JOIN` no MySQL?
4. O que são subconsultas simples?
5. Qual a diferença entre subconsulta simples e correlacionada?
6. O que são funções de agregação?
7. Para que serve `GROUP BY`?
8. O que é `HAVING` e como difere de `WHERE`?
9. Cite dois cenários práticos para `GROUP BY` + funções de agregação
10. Por que JOINs são importantes em bancos relacionais?

---

##  Aplicabilidade

- **Relatórios de Vendas:** Combinar clientes, pedidos e produtos em uma única consulta
- **Análise de Clientes:** Identificar clientes sem pedidos (LEFT JOIN + NULL)
- **Rankings:** Encontrar os produtos mais vendidos com subconsultas
- **Dashboards:** Somar e agrupar dados por período, categoria ou região
- **Auditoria:** Cruzar dados entre tabelas para encontrar inconsistências

---

>  **Resumo:** JOINs e subconsultas são as ferramentas mais poderosas do SQL para análise de dados relacionais. Saber quando usar cada tipo de JOIN, quando uma subconsulta é mais adequada do que um JOIN e como aplicar funções de agregação é essencial para criar relatórios e sistemas eficientes.