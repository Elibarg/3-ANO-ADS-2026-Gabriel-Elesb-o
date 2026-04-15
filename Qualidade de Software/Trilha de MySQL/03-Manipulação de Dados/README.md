#  Módulo 03 — Manipulação de Dados (DML)
> **Trilha de Banco de Dados | UniSENAI 2026**  

---

##  Sobre este Módulo

Este módulo aborda a **DML (Data Manipulation Language)** — o conjunto de comandos SQL responsável por **inserir, consultar, atualizar e excluir** dados em tabelas de um banco de dados relacional. É a base do dia a dia de qualquer desenvolvedor que trabalhe com bancos de dados.

---

##  Conteúdo

### 1. Inserção de Dados — `INSERT INTO`

O comando `INSERT INTO` adiciona novos registros a uma tabela existente.

**Sintaxe básica:**
```sql
INSERT INTO nome_da_tabela (coluna1, coluna2, ...)
VALUES (valor1, valor2, ...);
```

**Inserção de múltiplos registros simultaneamente:**
```sql
INSERT INTO clientes (id_cliente, nome, email, cidade)
VALUES
  (1, 'João Silva', 'joao@email.com', 'São Paulo'),
  (2, 'Maria Souza', 'maria@email.com', 'Rio de Janeiro'),
  (3, 'Carlos Pereira', 'carlos@email.com', 'Belo Horizonte');
```

>  **Dica:** Inserir múltiplos registros em uma única instrução é mais eficiente do que múltiplos `INSERT` separados.

**Uso de valores padrão (`DEFAULT`):**

Quando uma coluna tem um valor padrão definido na criação da tabela, ele pode ser omitido ou explicitamente chamado com `DEFAULT`:
```sql
INSERT INTO clientes (id_cliente, nome, email)
VALUES (4, 'Ana Oliveira', 'ana@email.com');
-- A coluna "cidade" receberá o valor padrão automaticamente
```

**Aplicações práticas:**
- Cadastro de novos usuários em sistemas
- Inserção de pedidos em sistemas de vendas
- Adição de produtos em gestão de estoque

---

### 2. Consulta de Dados — `SELECT`

O `SELECT` é o comando mais utilizado em SQL. Permite recuperar dados de uma ou mais tabelas com filtros, ordenações e agrupamentos.

**Sintaxe geral:**
```sql
SELECT colunas
FROM nome_da_tabela
[WHERE condição]
[ORDER BY coluna [ASC | DESC]]
[LIMIT número_registros]
[DISTINCT]
[GROUP BY coluna]
[HAVING condição];
```

---

#### 2.1 Cláusula `WHERE` — Filtragem

Filtra registros que atendem a uma condição específica:
```sql
SELECT * FROM clientes
WHERE cidade = 'São Paulo';
```

---

#### 2.2 Cláusula `ORDER BY` — Ordenação

Organiza os resultados em ordem crescente (`ASC`) ou decrescente (`DESC`):
```sql
SELECT * FROM clientes
ORDER BY nome ASC;
```

---

#### 2.3 Cláusula `LIMIT` — Limitação de Resultados

Restringe a quantidade de linhas retornadas:
```sql
SELECT * FROM clientes
LIMIT 2;
```

---

#### 2.4 Cláusula `DISTINCT` — Eliminar Duplicatas

Remove valores repetidos de uma coluna:
```sql
SELECT DISTINCT cidade
FROM clientes;
```

---

#### 2.5 Cláusula `GROUP BY` — Agrupamento

Agrupa registros com base em uma coluna, frequentemente usado com funções agregadas:
```sql
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade;
```

---

#### 2.6 Cláusula `HAVING` — Filtragem de Grupos

Filtra os resultados de um `GROUP BY` (equivalente ao `WHERE`, mas para grupos):
```sql
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade
HAVING COUNT(*) > 1;
```

>  **Atenção:** `WHERE` filtra **linhas individuais** antes do agrupamento. `HAVING` filtra **grupos** após o agrupamento.

---

#### 2.7 Operadores

**Comparação:**
| Operador | Descrição |
|----------|-----------|
| `=` | Igual |
| `>` / `<` | Maior / Menor |
| `BETWEEN` | Intervalo de valores |
| `IN` | Lista de valores |
| `LIKE` | Padrão com `%` |

**Lógicos:**
| Operador | Descrição |
|----------|-----------|
| `AND` | Ambas as condições verdadeiras |
| `OR` | Pelo menos uma condição verdadeira |
| `NOT` | Nega a condição |

**Exemplos:**
```sql
-- BETWEEN
SELECT * FROM clientes WHERE id_cliente BETWEEN 1 AND 2;

-- IN
SELECT * FROM clientes WHERE cidade IN ('São Paulo', 'Rio de Janeiro');

-- LIKE (nomes que começam com 'M')
SELECT * FROM clientes WHERE nome LIKE 'M%';

-- AND
SELECT * FROM clientes WHERE cidade = 'São Paulo' AND id_cliente > 1;

-- NOT
SELECT * FROM clientes WHERE NOT cidade = 'Rio de Janeiro';
```

---

### 3. Atualização de Dados — `UPDATE`

O comando `UPDATE` modifica os valores de registros existentes em uma tabela.

**Sintaxe geral:**
```sql
UPDATE nome_da_tabela
SET coluna1 = valor1, coluna2 = valor2, ...
[WHERE condição];
```

>  **ATENÇÃO CRÍTICA:** Sem a cláusula `WHERE`, **todos os registros da tabela serão atualizados!**

**Exemplo — atualizar um registro específico:**
```sql
UPDATE clientes
SET email = 'joao.silva@email.com'
WHERE id_cliente = 1;
```

**Atualização em massa:**
```sql
UPDATE clientes
SET cidade = 'Campinas'
WHERE cidade = 'São Paulo';
```

---

### 4. Exclusão de Dados — `DELETE` e `TRUNCATE`

#### 4.1 Comando `DELETE`

Remove registros específicos com base em uma condição:
```sql
DELETE FROM clientes
WHERE id_cliente = 2;
```

>  **ATENÇÃO:** Sem `WHERE`, todos os registros da tabela serão excluídos!

#### 4.2 Diferença entre `DELETE` e `TRUNCATE`

| Aspecto | `DELETE` | `TRUNCATE` |
|--------|----------|------------|
| Finalidade | Remove registros específicos | Remove **todos** os registros |
| Cláusula `WHERE` | Suportada | Não suportada |
| Velocidade | Mais lento (registra transações) | Mais rápido |
| ROLLBACK | Possível (dentro de transação) | Não possível |
| Contadores AUTO_INCREMENT | Mantidos | Redefinidos |

**Exemplo de TRUNCATE:**
```sql
TRUNCATE TABLE clientes;
-- Remove todos os registros de forma rápida e reseta o auto_increment
```

---

##  Questões Práticas

1. Crie a tabela `funcionarios` com `id_funcionario`, `nome`, `email` e `cargo`, depois insira 3 registros
2. Insira 5 registros adicionais de uma só vez
3. Adicione coluna `cidade` com valor padrão `"Não Informado"` e teste a omissão
4. Filtre funcionários com cargo `"Analista"` usando `WHERE`
5. Liste funcionários em ordem alfabética com `ORDER BY`
6. Exiba apenas os 3 primeiros registros com `LIMIT`
7. Liste cidades únicas com `DISTINCT`
8. Agrupe por cargo e conte com `GROUP BY + COUNT`
9. Atualize o cargo de todos os "João" para "Coordenador" com `UPDATE`
10. Remova todos os "Analistas" com `DELETE`

---

##  Questões Teóricas

1. Qual a diferença entre `INSERT INTO` e `UPDATE`?
2. O que `DELETE` faz diferente de `TRUNCATE`?
3. Por que usar `WHERE` em `UPDATE` e `DELETE` é tão importante?
4. Para que serve `ORDER BY`?
5. O que é `DEFAULT` na inserção de dados?
6. Para que serve `DISTINCT`?
7. Como funciona `GROUP BY`?
8. O que acontece sem índices em consultas com `WHERE`?
9. Cite dois operadores de comparação e dois lógicos
10. Qual a diferença entre `HAVING` e `WHERE`?

---

##  Aplicabilidade

- **Sistemas de Vendas:** Inserir e atualizar pedidos e clientes
- **Cadastro de Usuários:** Registrar novos usuários em plataformas
- **Gerenciamento de Estoque:** Adicionar, atualizar e remover produtos
- **Análise de Dados:** Agrupamentos e filtros para relatórios estratégicos

---

>  **Resumo:** DML é o coração das operações cotidianas com bancos de dados. Dominar `INSERT`, `SELECT`, `UPDATE` e `DELETE`, junto com suas cláusulas auxiliares, é fundamental para qualquer desenvolvedor back-end ou DBA.