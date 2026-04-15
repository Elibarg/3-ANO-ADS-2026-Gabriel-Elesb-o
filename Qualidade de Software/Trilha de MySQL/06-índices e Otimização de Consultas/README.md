#  Módulo 06 — Índices e Otimização de Consultas
> **Trilha de Banco de Dados | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Em sistemas com grande volume de dados, a performance das consultas SQL pode se tornar um gargalo crítico. Este módulo aborda como os **índices** funcionam para acelerar buscas, como usar o comando `EXPLAIN` para analisar o plano de execução de consultas e quais **boas práticas** aplicar para escrever SQL eficiente.

---

##  Conteúdo

### 1. O que são Índices?

Um **índice** é uma estrutura de dados criada pelo banco para **acelerar operações de busca**. Funciona como o índice de um livro: em vez de ler página por página, você vai direto ao ponto.

**Por que usar índices?**
- Aceleram consultas `SELECT`
- Melhoram desempenho em `WHERE`, `JOIN` e `ORDER BY`
- Reduzem o número de linhas analisadas em tabelas grandes
- Diminuem o tempo de resposta da aplicação

**Atenção ao custo dos índices:**
- Aumentam o tempo de `INSERT`, `UPDATE` e `DELETE` (o índice precisa ser atualizado)
- Consomem espaço em disco
- Exigem manutenção automática pelo banco

>  **Regra prática:** Indexe colunas **muito consultadas**, não colunas **muito alteradas**.

---

### 2. Criação de Índices

#### 2.1 Índice Simples — `CREATE INDEX`

Cria um índice em uma ou mais colunas para acelerar buscas:

```sql
CREATE INDEX idx_nome_cliente ON clientes(nome);
```

**Onde usar:**
- Filtros frequentes: `WHERE nome = ?`
- Ordenações: `ORDER BY nome`

---

#### 2.2 Índice Único — `CREATE UNIQUE INDEX`

Garante que não existam valores duplicados na coluna indexada:

```sql
CREATE UNIQUE INDEX idx_email_cliente ON clientes(email);
```

>  **Aplicação:** Garantir unicidade em colunas críticas como e-mails, CPFs ou códigos de identificação.

---

#### 2.3 Índices Compostos

Envolvem duas ou mais colunas. São eficientes quando a consulta usa as colunas **na mesma ordem do índice**:

```sql
CREATE INDEX idx_nome_cidade ON clientes(nome, cidade);
```

**Este índice é usado para:**
```sql
WHERE nome = ?                    --  usa o índice
WHERE nome = ? AND cidade = ?     --  usa o índice
```

**Este índice NÃO é usado para:**
```sql
WHERE cidade = ?                  --  ordem incorreta
```

>  A **ordem das colunas** no índice composto é determinante para sua eficácia!

---

### 3. Análise de Performance com `EXPLAIN`

O comando `EXPLAIN` exibe o **plano de execução** de uma consulta — como o banco vai executar a operação.

```sql
EXPLAIN SELECT * FROM clientes WHERE nome = 'João Silva';
```

**Campos importantes da saída:**

| Campo | Significado |
|-------|-------------|
| `type` | Tipo de busca — ideal: `index` ou `const` (evite `ALL`) |
| `key` | Índice utilizado na consulta |
| `rows` | Número de linhas examinadas (quanto menor, melhor) |
| `Extra` | Informações adicionais — evite `Using filesort` e `Using full table scan` |

>  **Interpretação:** Se `type = ALL`, o banco está fazendo um **Full Table Scan** — isso significa que nenhum índice está sendo usado.

---

### 4. Índices em JOINs e WHERE

Índices são especialmente eficazes em consultas com `JOIN` ou `WHERE` em colunas de relacionamento.

**Sem índice (lento):**
```sql
SELECT * FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
-- O banco analisa TODAS as linhas de pedidos para cada cliente
```

**Com índice (rápido):**
```sql
CREATE INDEX idx_id_cliente ON pedidos(id_cliente);

SELECT * FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
-- O banco vai direto às linhas correspondentes
```

---

### 5. Otimização de Consultas SQL

#### 5.1 Evitar Full Table Scan

Um **Full Table Scan** ocorre quando o banco analisa **todas as linhas** da tabela — é o pior cenário de performance.

**Estratégias para evitar:**

1. **Criar índices nas colunas filtradas:**
```sql
CREATE INDEX idx_cidade ON clientes(cidade);
SELECT * FROM clientes WHERE cidade = 'São Paulo'; -- usa o índice
```

2. **Não aplicar funções sobre colunas indexadas:**
```sql
--  Ineficiente: a função UPPER impede o uso do índice
SELECT * FROM clientes WHERE UPPER(nome) = 'JOÃO SILVA';

--  Eficiente: compara diretamente
SELECT * FROM clientes WHERE nome = 'João Silva';
```

3. **Usar `LIMIT` para reduzir registros processados:**
```sql
SELECT * FROM clientes LIMIT 10;
```

---

#### 5.2 Boas Práticas de Escrita de Consultas

**Selecione apenas as colunas necessárias:**
```sql
--  Ineficiente: busca todas as colunas
SELECT * FROM clientes;

--  Eficiente: busca apenas o necessário
SELECT nome, cidade FROM clientes;
```

**Substitua subconsultas por JOINs quando possível:**
```sql
--  Ineficiente: subconsulta executada para cada linha
SELECT nome FROM clientes
WHERE id_cliente = (SELECT id_cliente FROM pedidos WHERE valor_total > 100);

--  Eficiente: JOIN é mais performático
SELECT clientes.nome
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
WHERE pedidos.valor_total > 100;
```

**Use funções de agregação com cuidado:**
```sql
-- Agrupe e filtre somente onde necessário
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade
HAVING total_clientes > 10;
```

**Analise performance regularmente:**
```sql
EXPLAIN SELECT * FROM pedidos WHERE id_cliente = 1;
-- Verifique o campo "key" para confirmar que o índice está sendo usado
```

---

### 6. Resumo das Estratégias de Otimização

| Situação | Solução |
|----------|---------|
| Consulta lenta em `WHERE` | Criar índice na coluna filtrada |
| Consulta lenta em `JOIN` | Criar índice na coluna de junção |
| `SELECT *` desnecessário | Especificar apenas as colunas necessárias |
| Função sobre coluna indexada | Remover a função ou reestruturar a consulta |
| Muitos registros retornados | Usar `LIMIT` ou filtros mais específicos |
| Subconsulta lenta | Substituir por `JOIN` |
| Sem diagnóstico | Usar `EXPLAIN` para identificar gargalos |

---

##  Questões Práticas

1. Crie um índice básico em `nome` da tabela `clientes` e explique como melhora o `SELECT`
2. Crie um índice único em `email` para evitar duplicatas
3. Crie um índice composto em `nome` e `cidade` e explique sua otimização
4. Use `EXPLAIN` em um `JOIN` e interprete `type`, `key`, `rows` e `Extra`
5. Crie índice em `id_cliente` da tabela `pedidos` e demonstre o ganho em `JOIN`
6. Compare o plano de execução de um `SELECT` com e sem índice na coluna `nome`
7. Execute uma consulta retornando apenas 5 registros com `LIMIT` e explique o benefício
8. Otimize uma consulta que usa `UPPER(nome)` no filtro
9. Crie índices em `categoria` e `preco` da tabela `produtos`
10. Use `EXPLAIN` em uma consulta complexa, identifique gargalos e proponha melhorias

---

##  Questões Teóricas

1. O que são índices e por que são importantes para tabelas grandes?
2. Diferencie `CREATE INDEX` e `CREATE UNIQUE INDEX`
3. O que é um índice composto e quando usá-lo?
4. Como índices afetam `INSERT`, `UPDATE` e `DELETE`?
5. Qual o objetivo do `EXPLAIN`? O que ele informa?
6. O que é Full Table Scan e como evitá-lo?
7. Por que `LIMIT` pode melhorar a performance?
8. Como índices melhoram consultas com `JOIN`?
9. Liste três boas práticas para escrever SQL eficiente
10. Como funções de agregação (`COUNT`, `SUM`, `AVG`) podem impactar a performance?

---

##  Aplicabilidade

- **Sistemas de Vendas:** Índices em `id_cliente` e `data_pedido` para relatórios rápidos
- **E-commerce:** Índices em `categoria` e `preco` para filtros em catálogos
- **Gestão de Projetos:** Índices compostos em `id_projeto` e `id_funcionario`
- **Auditoria de Performance:** Usar `EXPLAIN` regularmente para identificar consultas lentas

---

>  **Resumo:** Índices bem planejados e consultas SQL otimizadas são a diferença entre um sistema que funciona e um sistema que **performa**. Use `EXPLAIN` como ferramenta de diagnóstico, crie índices nas colunas corretas e evite práticas que impedem o uso dos índices — como aplicar funções sobre colunas indexadas.