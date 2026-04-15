#  Módulo 04 — Relacionamento entre Tabelas
> **Trilha de Banco de Dados | UniSENAI 2026**  

---

##  Sobre este Módulo

Uma das maiores forças dos bancos de dados relacionais é a capacidade de **conectar tabelas entre si** de forma estruturada e íntegra. Este módulo apresenta os conceitos de **chave primária**, **chave estrangeira**, **integridade referencial** e os três tipos principais de relacionamento: **1:1**, **1:N** e **N:M**.

---

##  Conteúdo

### 1. Conceitos de Relacionamentos

Relacionamentos entre tabelas são construídos com dois elementos fundamentais:

- **Chave Primária (PRIMARY KEY):** Identifica unicamente cada registro de uma tabela
- **Chave Estrangeira (FOREIGN KEY):** Referencia a chave primária de outra tabela, criando um vínculo

---

### 2. Chave Primária — `PRIMARY KEY`

A chave primária garante que cada linha de uma tabela seja única e identificável.

**Características:**
- Deve ser **única** para cada registro
- **Não pode ser nula** (NOT NULL implícito)
- Pode ser composta por mais de uma coluna (**chave composta**)

**Exemplo:**
```sql
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);
```

| id_cliente | nome | email |
|-----------|------|-------|
| 1 | João Silva | joao.silva@email.com |
| 2 | Maria Silva | maria@email.com |

>  `AUTO_INCREMENT` gera valores únicos automaticamente para a chave primária.

---

### 3. Chave Estrangeira — `FOREIGN KEY`

A chave estrangeira é uma coluna que referencia a chave primária de outra tabela, criando o relacionamento entre elas.

**Características:**
- Garante que os valores inseridos **correspondam a um registro existente** na tabela referenciada
- Restringe ações que possam **comprometer a integridade** dos dados

**Exemplo:**
```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

| id_pedido | id_cliente | valor_total |
|-----------|-----------|-------------|
| 101 | 1 | 150.00 |
| 102 | 2 | 200.00 |

---

### 4. Integridade Referencial

A integridade referencial garante que os vínculos entre tabelas **permaneçam sempre válidos**.

**Regras:**

| Operação | Regra |
|----------|-------|
| **Inserção** | Não é permitido inserir uma FK que não existe na tabela referenciada |
| **Atualização** | A alteração de uma PK deve ser refletida nas tabelas relacionadas |
| **Exclusão** | Não é permitido excluir um registro referenciado (a menos que CASCADE seja definido) |

**Exemplo de violação:**
```sql
-- ERRO: id_cliente = 3 não existe na tabela clientes
INSERT INTO pedidos (id_pedido, id_cliente, valor_total)
VALUES (103, 3, 100.00);
```

**Solução com `ON DELETE CASCADE`:**
```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

**Comportamento dos modificadores:**

| Modificador | Comportamento |
|-------------|--------------|
| `ON DELETE CASCADE` | Exclui automaticamente os registros filhos quando o pai é deletado |
| `ON UPDATE CASCADE` | Atualiza automaticamente a FK quando a PK referenciada muda |
| `SET NULL` | Define a FK como NULL quando o pai é deletado/atualizado |

---

### 5. Tipos de Relacionamentos

#### 5.1 Um para Um (1:1)

Um registro em uma tabela está associado a **no máximo um** registro em outra tabela.

**Caso de uso:** Separar dados sensíveis de dados gerais para melhorar a segurança.

```sql
CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE detalhes_cliente (
    id_cliente INT PRIMARY KEY,
    cpf CHAR(11),
    data_nascimento DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

| id_cliente | cpf | data_nascimento |
|-----------|-----|-----------------|
| 1 | 12345678901 | 1980-05-15 |
| 2 | 98765432109 | 1990-08-22 |

>  **Aplicação prática:** Armazenar CPF e data de nascimento separados da tabela principal para restringir acesso a dados sensíveis.

---

#### 5.2 Um para Muitos (1:N)

Um registro em uma tabela está relacionado a **vários registros** em outra tabela. É o **tipo mais comum** de relacionamento.

**Caso de uso:** Um cliente pode ter vários pedidos, mas cada pedido pertence a apenas um cliente.

```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

| id_pedido | id_cliente | valor_total |
|-----------|-----------|-------------|
| 101 | 1 | 150.00 |
| 102 | 1 | 200.00 |
| 103 | 2 | 300.00 |

>  **Aplicação prática:** Sistemas de vendas, plataformas de e-commerce, controle de atendimentos.

---

#### 5.3 Muitos para Muitos (N:M)

Vários registros em uma tabela estão relacionados a **vários registros** em outra tabela. Requer uma **tabela intermediária (de junção)**.

**Caso de uso:** Um pedido pode conter vários produtos e um produto pode estar em vários pedidos.

```sql
-- Tabelas principais
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10, 2)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data DATE
);

-- Tabela intermediária
CREATE TABLE pedido_produto (
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE CASCADE ON UPDATE CASCADE
);
```

**Tabela intermediária `pedido_produto`:**
| id_pedido | id_produto | quantidade |
|-----------|-----------|-----------|
| 101 | 1 | 1 |
| 101 | 3 | 2 |
| 102 | 3 | 1 |

>  A **chave composta** `PRIMARY KEY (id_pedido, id_produto)` evita duplicatas no relacionamento.

---

### 6. Resumo dos Relacionamentos

| Tipo | Definição | Exemplo |
|------|-----------|---------|
| **1:1** | Um registro relacionado a um único registro em outra tabela | `clientes` e `detalhes_cliente` |
| **1:N** | Um registro relacionado a vários registros em outra tabela | `clientes` e seus `pedidos` |
| **N:M** | Vários registros relacionados a vários registros em outra tabela | `pedidos` e `produtos` com tabela intermediária |

---

### 7. Utilizando Tabelas Intermediárias

**Inserindo dados:**
```sql
INSERT INTO pedido_produto (id_pedido, id_produto, quantidade)
VALUES
    (101, 1, 1),
    (101, 2, 2),
    (102, 1, 3);
```

**Consultando dados com JOIN:**
```sql
SELECT pedidos.id_pedido, produtos.nome, pedido_produto.quantidade
FROM pedido_produto
JOIN pedidos ON pedido_produto.id_pedido = pedidos.id_pedido
JOIN produtos ON pedido_produto.id_produto = produtos.id_produto
WHERE pedidos.id_pedido = 101;
```

**Resultado:**
| id_pedido | nome | quantidade |
|-----------|------|-----------|
| 101 | Notebook | 1 |
| 101 | Smartphone | 2 |

---

##  Questões Práticas

1. **Chave Primária e Estrangeira:** Crie as tabelas `clientes` e `pedidos` com os relacionamentos corretos e explique sua importância
2. **Integridade Referencial:** Configure `ON DELETE CASCADE` na tabela `pedidos` e explique o comportamento
3. **Relacionamento 1:N:** Insira 10 registros em `clientes` e `pedidos` e liste pedidos de um cliente específico
4. **Relacionamento N:N:** Crie `produtos`, `pedidos` e a tabela intermediária `pedido_produto`
5. **JOIN:** Retorne nomes de clientes, produtos comprados e quantidade
6. **Exclusão em Cascata:** Delete um cliente e verifique se os pedidos foram removidos
7. **Atualização em Cascata:** Altere um `id_cliente` e verifique a propagação
8. **Cardinalidades:** Configure exemplos práticos para 1:1, 1:N e N:M
9. **Tabelas Intermediárias:** Liste pedidos contendo um produto específico
10. **Boas Práticas:** Analise um banco fictício e proponha melhorias

---

##  Questões Teóricas

1. O que é relacionamento entre tabelas e como PK/FK o implementam?
2. Quais as características de uma chave primária?
3. O que é uma chave estrangeira e qual sua importância?
4. O que é integridade referencial?
5. Diferencie 1:1, 1:N e N:M com exemplos
6. Qual a diferença entre `ON DELETE CASCADE` e `ON UPDATE CASCADE`?
7. Qual a função de uma tabela intermediária em N:M?
8. Quais os benefícios de usar tabelas relacionadas vs. uma única tabela?
9. O que pode acontecer sem relacionamentos corretos?
10. Em quais situações reais você usaria 1:N e N:M?

---

##  Aplicabilidade

- **E-commerce:** Gerenciar pedidos, produtos e carrinhos de compras
- **Sistemas Acadêmicos:** Relacionar alunos e cursos em matrículas
- **Gestão de Projetos:** Associar projetos a múltiplos membros de equipe
- **Segurança:** Separar dados sensíveis em tabelas com acesso restrito

---

>  **Resumo:** Os relacionamentos são a essência dos bancos de dados relacionais. Compreender PK, FK, integridade referencial e os três tipos de cardinalidade é indispensável para projetar sistemas robustos, escaláveis e livres de inconsistências.