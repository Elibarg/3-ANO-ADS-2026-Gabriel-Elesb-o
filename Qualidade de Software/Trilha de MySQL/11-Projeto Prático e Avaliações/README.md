#  Módulo 11 — Projeto Prático e Avaliações
> **Trilha de Banco de Dados | UniSENAI 2026**  

---

##  Sobre este Módulo

Este é o módulo final da Trilha de Banco de Dados. Seu objetivo é **integrar e consolidar** todos os conhecimentos adquiridos nos módulos anteriores através do desenvolvimento de um **Sistema de Vendas completo**, simulando um cenário real de mercado. O projeto contempla desde a modelagem relacional até a otimização com índices e procedimentos armazenados.

---

##  Objetivo do Projeto

Desenvolver um sistema de gerenciamento de pedidos de venda para uma **empresa fictícia**, contemplando:

- Controle de **Clientes**
- Controle de **Produtos** e **Estoque**
- Registro de **Pedidos**
- Relacionamento entre pedidos e produtos

---

##  Estrutura do Projeto

### 1. Modelagem do Banco de Dados

O primeiro passo é criar o **modelo relacional**, respeitando boas práticas de normalização e integridade referencial.

**Ferramenta sugerida:** MySQL Workbench (para criação do diagrama ER)

---

#### Tabelas Obrigatórias

**Tabela `clientes`**
```sql
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20)
);
```
> Armazena as informações dos clientes.

---

**Tabela `produtos`**
```sql
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0
);
```
> Contém os dados dos produtos disponíveis para venda, incluindo controle de estoque.

---

**Tabela `pedidos`**
```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_pedido DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    ON DELETE RESTRICT ON UPDATE CASCADE
);
```
> Registra os pedidos realizados pelos clientes (relacionamento 1:N com clientes).

---

**Tabela `pedido_produto` (tabela de junção N:M)**
```sql
CREATE TABLE pedido_produto (
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    ON DELETE RESTRICT ON UPDATE CASCADE
);
```
> Tabela de junção que representa o relacionamento **N:N** entre pedidos e produtos.

---

#### Diagrama de Relacionamentos

```
clientes (1) ──── (N) pedidos (N) ──── (M) produtos
                         │
                 pedido_produto
              (id_pedido, id_produto, quantidade)
```

---

### 2. Criação de Relacionamentos e Integridade Referencial

**Requisitos:**
- Chaves primárias (`PK`) definidas em todas as tabelas
- Chaves estrangeiras (`FK`) com restrições adequadas
- Uso de `ON DELETE` e `ON UPDATE` onde apropriado
- Garantia de integridade entre pedidos, clientes e produtos

**Boas práticas:**
- `ON DELETE CASCADE` na `pedido_produto` → ao deletar pedido, remove os itens
- `ON DELETE RESTRICT` em `pedidos` → não permite deletar cliente com pedidos ativos
- `ON UPDATE CASCADE` → propaga atualizações de IDs automaticamente

---

### 3. Consultas com JOINs e Subconsultas

#### 3.1 JOIN — Listar todos os pedidos com detalhes

```sql
SELECT
    p.id_pedido,
    c.nome AS cliente,
    pr.nome AS produto,
    pp.quantidade
FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
JOIN pedido_produto pp ON p.id_pedido = pp.id_pedido
JOIN produtos pr ON pp.id_produto = pr.id_produto;
```

**Resultado esperado:**
| id_pedido | cliente | produto | quantidade |
|-----------|---------|---------|-----------|
| 1 | Emerson Amancio | Playstation 5 | 10 |
| 3 | Emerson Amancio | Playstation 5 | 1 |
| 4 | Emerson Amancio | Playstation 5 | 5 |

---

#### 3.2 Subconsulta — Produto mais vendido

```sql
SELECT nome
FROM produtos
WHERE id_produto = (
    SELECT id_produto
    FROM pedido_produto
    GROUP BY id_produto
    ORDER BY SUM(quantidade) DESC
    LIMIT 1
);
```

---

### 4. Procedimentos Armazenados (Stored Procedures)

#### Exemplo Obrigatório — Registrar pedido e atualizar estoque

```sql
DELIMITER $$

CREATE PROCEDURE registrar_pedido(
    IN p_id_cliente INT,
    IN p_id_produto INT,
    IN p_quantidade INT
)
BEGIN
    DECLARE v_id_pedido INT;
    DECLARE v_estoque INT;

    -- Verificar estoque disponível
    SELECT estoque INTO v_estoque
    FROM produtos WHERE id_produto = p_id_produto;

    IF v_estoque < p_quantidade THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente.';
    END IF;

    -- Criar o pedido
    INSERT INTO pedidos (id_cliente, data_pedido)
    VALUES (p_id_cliente, CURDATE());

    SET v_id_pedido = LAST_INSERT_ID();

    -- Inserir item do pedido
    INSERT INTO pedido_produto (id_pedido, id_produto, quantidade)
    VALUES (v_id_pedido, p_id_produto, p_quantidade);

    -- Atualizar estoque
    UPDATE produtos
    SET estoque = estoque - p_quantidade
    WHERE id_produto = p_id_produto;

END$$

DELIMITER ;
```

**Executar o procedimento:**
```sql
CALL registrar_pedido(1, 2, 3);
-- Registra pedido do cliente 1, produto 2, quantidade 3
```

**Boas práticas no procedimento:**
- Uso de **transações** para garantir atomicidade
- Verificação de estoque **antes** da inserção
- Tratamento de erro com `SIGNAL SQLSTATE`
- Bônus: implementar controle para evitar estoque negativo

---

### 5. Otimização de Consultas

#### 5.1 Criação de Índices Estratégicos

```sql
-- Acelera consultas de pedidos por cliente
CREATE INDEX idx_cliente ON pedidos(id_cliente);

-- Acelera consultas de itens por produto
CREATE INDEX idx_produto ON pedido_produto(id_produto);
```

#### 5.2 Análise com `EXPLAIN`

```sql
EXPLAIN SELECT * FROM pedidos WHERE id_cliente = 1;
-- Verificar se o campo "key" mostra o índice sendo usado
```

#### 5.3 Boa Prática de Consulta

```sql
--  Evitar: função na coluna impede uso do índice
WHERE UPPER(nome) = 'EMERSON'

--  Correto: comparação direta usa o índice
WHERE nome = 'Emerson'
```

---

### 6. Critérios de Avaliação

| Critério | Descrição |
|----------|-----------|
| **Modelagem** | Estrutura clara, relacionamentos bem definidos, normalização |
| **Funcionalidade** | Consultas que atendem os requisitos, procedures funcionais |
| **Otimização** | Índices criados e usados corretamente, análise com EXPLAIN |
| **Clareza** | Código bem estruturado, comentado e documentado |

---

##  Checklist do Projeto

- [ ] Tabela `clientes` criada com PK
- [ ] Tabela `produtos` criada com PK e campo `estoque`
- [ ] Tabela `pedidos` criada com FK para `clientes`
- [ ] Tabela `pedido_produto` criada com chave composta e FKs
- [ ] Diagrama ER gerado no MySQL Workbench
- [ ] `ON DELETE/UPDATE` configurados corretamente
- [ ] JOIN listando todos os pedidos com cliente e produtos
- [ ] Subconsulta identificando produto mais vendido
- [ ] Stored Procedure `registrar_pedido` criada e testada
- [ ] Índices criados em colunas estratégicas
- [ ] `EXPLAIN` usado para análise de performance
- [ ] Código documentado com comentários

---

##  Aplicabilidade

**Sistemas de Vendas:**
- Gerenciamento completo de clientes, pedidos e produtos
- Relatórios detalhados de vendas e controle de estoque

**E-commerce:**
- Controle de inventário
- Processamento de pedidos com atualização automática de estoque
- Carrinho de compras (relacionamento N:M com tabela intermediária)

**Sistemas Acadêmicos:**
- Estrutura análoga para gestão de alunos, cursos e matrículas

---

>  **Resumo:** O projeto final integra todos os conceitos da trilha: modelagem relacional, DML, JOINs, subconsultas, stored procedures, índices, triggers e boas práticas de segurança. É a oportunidade de aplicar o aprendizado em um cenário real, construindo um sistema completo do zero e preparando-se para os desafios do mercado de trabalho.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 03 | Manipulação de Dados (DML) |
| 04 | Relacionamento entre Tabelas |
| 05 | Consultas Avançadas (JOINs e Subconsultas) |
| 06 | Índices e Otimização de Consultas |
| 07 | Segurança e Controle de Acesso |
| 08 | Backup e Restauração |
| 09 | Funções e Procedimentos Armazenados |
| 10 | Triggers e Eventos |
| **11** | **Projeto Prático e Avaliações** |