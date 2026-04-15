#  Módulo 02 — Estruturação de Banco de Dados
> **Trilha de Banco de Dados | UniSENAI 2026**  


---

##  Sobre este Módulo

Este módulo é a base de todo o aprendizado em bancos de dados relacionais. Antes de escrever qualquer linha de SQL, é fundamental saber **planejar e estruturar** o banco corretamente. Aqui são apresentados o **Modelo de Entidade e Relacionamento (MER)**, os comandos DDL para **criação e gerenciamento de bancos e tabelas**, os **tipos de dados**, as **restrições de integridade** e o comando `ALTER TABLE` para evoluir a estrutura sem precisar recriar tudo do zero.

---

##  Conteúdo

### 1. Modelo de Entidade e Relacionamento (MER)

O **MER** é uma técnica de modelagem que permite **planejar, visualizar e organizar** as informações que serão armazenadas no banco de dados — e os relacionamentos entre elas — **antes** de qualquer implementação no SGBD.

**Por que usar o MER?**
- Melhor entendimento do domínio do sistema
- Redução de erros de modelagem
- Maior integridade e consistência dos dados
- Facilidade de manutenção e evolução futura do banco

>  Pense no MER como a **planta arquitetônica** de uma casa: você não começa a construir antes de ter o projeto desenhado.

---

#### 1.1 Entidades

**Entidades** representam objetos ou conceitos do mundo real que possuem existência própria dentro do sistema — são as "coisas" sobre as quais o banco precisa guardar informações.

**Exemplos de entidades e seus atributos:**

**Entidade `Cliente`:**
| Atributo | Tipo | Observação |
|----------|------|------------|
| `id_cliente` | INT | Chave Primária |
| `nome` | VARCHAR | Nome do cliente |
| `email` | VARCHAR | E-mail de contato |
| `telefone` | VARCHAR | Telefone de contato |

**Entidade `Produto`:**
| Atributo | Tipo | Observação |
|----------|------|------------|
| `id_produto` | INT | Chave Primária |
| `nome` | VARCHAR | Nome do produto |
| `preco` | DECIMAL | Preço de venda |
| `estoque` | INT | Quantidade em estoque |

**Boas Práticas para Entidades:**
- Sempre defina uma **chave primária única** para cada entidade
- Utilize nomes **claros e objetivos** (ex.: `cliente`, não `dados_do_cliente_sistema`)
- Evite atributos **redundantes** — se `preco_produto` e `valor_produto` representam a mesma informação, use apenas um

---

#### 1.2 Atributos

**Atributos** representam as características de uma entidade — são as colunas que descrevem os dados que serão armazenados.

**Exemplo — Atributos da entidade `Pedido`:**
| Atributo | Tipo | Observação |
|----------|------|------------|
| `id_pedido` | INT | Chave Primária |
| `data_pedido` | DATE | Data em que o pedido foi feito |
| `id_cliente` | INT | Chave Estrangeira (referencia `clientes`) |

**Boas Práticas para Atributos:**
- Use nomes que **reflitam claramente** a natureza do dado (ex.: `data_nascimento`, não `data1`)
- Escolha **tipos de dados adequados** para otimizar armazenamento e desempenho
- Prefira `VARCHAR(100)` para nomes em vez de `TEXT`, quando o limite é previsível — `TEXT` é mais pesado para indexação

---

#### 1.3 Relacionamentos

**Relacionamentos** descrevem como as entidades se conectam entre si dentro do sistema.

**Exemplos:**
- **Cliente realiza Pedido** → Tipo: 1:N (um cliente pode realizar vários pedidos)
- **Produto pertence a Categoria** → Tipo: N:1 (vários produtos pertencem a uma categoria)

**Boas Práticas para Relacionamentos:**
- Nomeie os relacionamentos de forma **clara e sem ambiguidade** (use verbos: "realiza", "pertence", "contém")
- Defina se o relacionamento é **obrigatório ou opcional** (exemplo: nem todo cliente precisa ter pedidos cadastrados)

---

#### 1.4 Cardinalidades

A **cardinalidade** define quantas ocorrências de uma entidade podem se relacionar com outra — é a "quantidade" do relacionamento.

**Tipos comuns:**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **1:1** | Um para Um | Um Cliente possui um Endereço Fiscal |
| **1:N** | Um para Muitos | Um Cliente pode realizar vários Pedidos |
| **N:M** | Muitos para Muitos | Um Produto pode estar em vários Pedidos e um Pedido pode conter vários Produtos |

**Boas Práticas para Cardinalidades:**
- As cardinalidades devem **refletir fielmente as regras do negócio**
- Relacionamentos **N:M** devem sempre ser resolvidos com uma **tabela intermediária**

**Exemplo de tabela intermediária para N:M:**
```
pedidos (N) ←→ pedido_produto ←→ (M) produtos
```
A tabela `pedido_produto` contém `id_pedido` + `id_produto` + `quantidade`, resolvendo o relacionamento muitos para muitos.

---

#### 1.5 Modelo Lógico e Modelo Físico

O projeto de banco de dados passa por **duas camadas de abstração** antes da implementação:

**Modelo Lógico:**
- Representa entidades, atributos e relacionamentos de forma **independente do SGBD**
- Geralmente ilustrado por **Diagramas de Entidade-Relacionamento (DER)**
- Pode ser criado no **MySQL Workbench**
- Foco em "o quê" o banco armazena, não "como"

**Modelo Físico:**
- Representa a **implementação real** no SGBD escolhido (MySQL, PostgreSQL, etc.)
- Define tipos de dados, chaves primárias, estrangeiras e restrições (constraints)
- É implementado diretamente por **comandos SQL**

**Exemplo de Modelo Físico em SQL:**
```sql
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(15)
);
```

---

### 2. Criação e Gerenciamento de Bancos de Dados

Com o modelo definido, é hora de implementar. Os comandos a seguir fazem parte da **DDL (Data Definition Language)** — a linguagem de definição de estruturas em SQL.

---

#### 2.1 `CREATE DATABASE` — Criar Banco de Dados

Cria um novo banco de dados no servidor MySQL.

**Sintaxe:**
```sql
CREATE DATABASE nome_do_banco;
```

**Exemplo:**
```sql
CREATE DATABASE loja_virtual;
```

**Com definição de conjunto de caracteres (recomendado):**
```sql
CREATE DATABASE loja_virtual
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
```

**Por que usar `CHARACTER SET` e `COLLATE`?**
- `utf8mb4` suporta **todos os caracteres Unicode**, incluindo emojis e caracteres especiais
- `utf8mb4_general_ci` define as **regras de comparação** (ci = case insensitive → sem distinção entre maiúsculas e minúsculas)
- Evita problemas com acentos (ã, ç, é) e caracteres especiais em sistemas em português

**Boas Práticas:**
- Dê **nomes significativos** ao banco (ex.: `sistema_vendas`, não `banco1`)
- Sempre defina `CHARACTER SET` e `COLLATE` para evitar problemas de encoding

---

#### 2.2 `DROP DATABASE` — Excluir Banco de Dados

Remove **permanentemente** um banco de dados e todo o seu conteúdo.

**Sintaxe:**
```sql
DROP DATABASE nome_do_banco;
```

**Exemplo:**
```sql
DROP DATABASE loja_virtual;
```

>  **ATENÇÃO CRÍTICA:** Este comando é **irreversível**. Todos os dados, tabelas, índices e procedures serão deletados permanentemente.

**Boas Práticas:**
- Sempre faça um **backup completo** antes de usar `DROP DATABASE`
- Evite executar este comando em **ambientes de produção** sem validação rigorosa
- Use `SHOW DATABASES;` primeiro para confirmar que está no banco correto

---

#### 2.3 `USE` — Selecionar Banco de Dados

Seleciona qual banco de dados será utilizado para os próximos comandos SQL.

**Sintaxe:**
```sql
USE nome_do_banco;
```

**Exemplo:**
```sql
USE loja_virtual;
```

A partir desse momento, qualquer comando SQL (`CREATE TABLE`, `INSERT`, `SELECT`, etc.) será executado dentro do banco `loja_virtual`.

**Boas Práticas:**
- Sempre verifique se o banco foi selecionado corretamente antes de executar comandos
- Use `SHOW DATABASES;` para listar todos os bancos disponíveis
- Use `SELECT DATABASE();` para verificar qual banco está ativo no momento

---

#### Resumo dos Comandos de Banco de Dados

| Comando | Função | Sintaxe |
|---------|--------|---------|
| `CREATE DATABASE` | Cria um novo banco de dados | `CREATE DATABASE nome;` |
| `DROP DATABASE` | Exclui um banco de dados | `DROP DATABASE nome;` |
| `USE` | Seleciona um banco para uso | `USE nome;` |
| `SHOW DATABASES` | Lista todos os bancos | `SHOW DATABASES;` |

**Exercício prático proposto:**
```sql
-- 1. Criar o banco
CREATE DATABASE biblioteca;

-- 2. Selecionar o banco
USE biblioteca;

-- 3. Excluir o banco (após confirmar que não há dados importantes)
DROP DATABASE biblioteca;
```

---

### 3. Criação e Gerenciamento de Tabelas

#### 3.1 `CREATE TABLE` — Criar Tabela

Cria uma nova tabela dentro do banco de dados selecionado.

**Sintaxe:**
```sql
CREATE TABLE nome_da_tabela (
    nome_coluna1 TIPO_DADO RESTRIÇÃO,
    nome_coluna2 TIPO_DADO RESTRIÇÃO,
    ...
);
```

**Exemplo completo — Tabela `clientes`:**
```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(15),
    data_cadastro DATE DEFAULT CURRENT_DATE
);
```

**Análise de cada coluna:**
| Coluna | Tipo | Restrição | Significado |
|--------|------|-----------|-------------|
| `id` | INT | AUTO_INCREMENT PRIMARY KEY | Identificador único, gerado automaticamente |
| `nome` | VARCHAR(100) | NOT NULL | Nome obrigatório, até 100 caracteres |
| `email` | VARCHAR(100) | UNIQUE | E-mail único — não pode repetir na tabela |
| `telefone` | VARCHAR(15) | — | Opcional, até 15 caracteres |
| `data_cadastro` | DATE | DEFAULT CURRENT_DATE | Preenchido automaticamente com a data atual |

---

#### 3.2 Tabela com Chave Estrangeira

**Exemplo — Tabela `pedidos` referenciando `clientes`:**
```sql
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_pedido DATE DEFAULT CURRENT_DATE,
    valor_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

>  A `FOREIGN KEY` garante que só é possível inserir em `pedidos` um `cliente_id` que já exista na tabela `clientes`.

---

#### 3.3 Tipos de Dados

Os tipos de dados definem **que tipo de informação** cada coluna pode armazenar. Escolher o tipo correto impacta diretamente no desempenho e no espaço em disco.

| Tipo de Dado | Descrição | Exemplo de uso |
|-------------|-----------|----------------|
| `INT` | Números inteiros | Identificadores, quantidade em estoque |
| `VARCHAR(n)` | Texto de até `n` caracteres | Nomes, emails, telefones |
| `TEXT` | Texto longo sem limite definido | Descrições, observações extensas |
| `DATE` | Data no formato `AAAA-MM-DD` | Data de nascimento, data do pedido |
| `DATETIME` | Data e hora `AAAA-MM-DD HH:MM:SS` | Timestamps de criação/atualização |
| `DECIMAL(x, y)` | Número decimal com `x` dígitos e `y` casas decimais | Preços, salários |
| `BOOLEAN` | Valores `TRUE` ou `FALSE` | Status ativo/inativo |
| `FLOAT` | Número de ponto flutuante | Coordenadas geográficas |

**Dica importante:**
- Use `VARCHAR(100)` para nomes, não `TEXT` — `VARCHAR` é mais eficiente para colunas com tamanho previsível e pode ser indexado com facilidade
- Use `DECIMAL(10, 2)` para valores monetários, nunca `FLOAT` — `FLOAT` pode causar erros de arredondamento em valores financeiros

---

#### 3.4 Restrições (Constraints)

As restrições garantem a **integridade dos dados** ao impor regras sobre os valores que podem ser inseridos em cada coluna.

| Restrição | Descrição | Exemplo |
|-----------|-----------|---------|
| `PRIMARY KEY` | Identifica unicamente cada registro — não pode ser nula nem repetida | `id INT PRIMARY KEY` |
| `FOREIGN KEY` | Cria relacionamento com outra tabela — garante integridade referencial | `FOREIGN KEY (col) REFERENCES tabela(col)` |
| `UNIQUE` | Garante que o valor da coluna é único na tabela | `email VARCHAR(100) UNIQUE` |
| `NOT NULL` | Impede valores nulos na coluna — campo obrigatório | `nome VARCHAR(100) NOT NULL` |
| `DEFAULT` | Define um valor padrão quando nenhum valor é informado | `data DATE DEFAULT CURRENT_DATE` |
| `AUTO_INCREMENT` | Incrementa automaticamente o valor a cada novo registro | `id INT AUTO_INCREMENT` |

---

### 4. Alteração de Tabelas — `ALTER TABLE`

O `ALTER TABLE` permite **modificar a estrutura de uma tabela existente** sem precisar deletá-la e recriá-la. Isso é essencial para a evolução de sistemas em produção.

---

#### 4.1 Adicionar Coluna — `ADD`

```sql
ALTER TABLE nome_da_tabela ADD nome_da_coluna TIPO_DADO(RESTRIÇÃO);
```

**Exemplo — Adicionar coluna `endereco` em `clientes`:**
```sql
ALTER TABLE clientes ADD endereco VARCHAR(255);
```

>  Novos registros terão `NULL` na coluna `endereco` até que o valor seja informado. Use `NOT NULL DEFAULT 'valor'` se quiser um valor padrão obrigatório.

---

#### 4.2 Remover Coluna — `DROP COLUMN`

```sql
ALTER TABLE nome_da_tabela DROP COLUMN nome_da_coluna;
```

**Exemplo — Remover coluna `telefone` de `clientes`:**
```sql
ALTER TABLE clientes DROP COLUMN telefone;
```

>  **Atenção:** A remoção de uma coluna é **permanente** e todos os dados daquela coluna são perdidos.

---

#### 4.3 Modificar Coluna — `MODIFY`

Altera o tipo de dado ou as restrições de uma coluna existente:

```sql
ALTER TABLE nome_da_tabela MODIFY nome_da_coluna TIPO_DADO(RESTRIÇÃO);
```

**Exemplo — Aumentar o tamanho da coluna `nome` e torná-la obrigatória:**
```sql
ALTER TABLE clientes MODIFY nome VARCHAR(150) NOT NULL;
```

---

#### 4.4 Alterar Restrições — `ADD FOREIGN KEY` / `DROP FOREIGN KEY`

**Adicionar chave estrangeira em tabela existente:**
```sql
ALTER TABLE pedidos ADD FOREIGN KEY (cliente_id) REFERENCES clientes(id);
```

**Remover chave estrangeira existente:**
```sql
ALTER TABLE pedidos DROP FOREIGN KEY fk_cliente_id;
```

>  Para remover uma `FOREIGN KEY`, é necessário conhecer o **nome da constraint**. Use `SHOW CREATE TABLE pedidos;` para visualizar o nome exato.

---

#### Resumo do `ALTER TABLE`

| Operação | Sintaxe |
|----------|---------|
| Adicionar coluna | `ALTER TABLE tabela ADD coluna TIPO;` |
| Remover coluna | `ALTER TABLE tabela DROP COLUMN coluna;` |
| Modificar coluna | `ALTER TABLE tabela MODIFY coluna NOVO_TIPO;` |
| Adicionar FK | `ALTER TABLE tabela ADD FOREIGN KEY (col) REFERENCES outra(col);` |
| Remover FK | `ALTER TABLE tabela DROP FOREIGN KEY nome_fk;` |

---

### 5. Exclusão de Tabelas — `DROP TABLE`

Remove uma tabela e **todo o seu conteúdo permanentemente**.

**Sintaxe:**
```sql
DROP TABLE nome_da_tabela;
```

**Exemplo:**
```sql
DROP TABLE pedidos;
```

>  **ATENÇÃO:** `DROP TABLE` é **irreversível**. Todos os dados da tabela são perdidos. Sempre faça backup antes de executar.

**Diferença importante:**

| Comando | O que faz |
|---------|-----------|
| `DROP TABLE` | Remove a tabela e sua estrutura completamente |
| `TRUNCATE TABLE` | Remove todos os registros, mas mantém a estrutura da tabela |
| `DELETE FROM tabela` | Remove registros específicos (com `WHERE`) ou todos, mas mantém a estrutura |

---

##  Exercícios Práticos

**Exercícios de tabelas:**
1. Crie a tabela `produtos` com as colunas `id`, `nome`, `preco`, `quantidade_estoque` e `data_cadastro`, usando as restrições adequadas
2. Adicione uma coluna `descricao` à tabela `produtos`
3. Altere o tipo de dados da coluna `preco` para `DECIMAL(8, 2)`
4. Exclua a coluna `quantidade_estoque` da tabela `produtos`
5. Exclua a tabela `produtos` completamente

**Comandos esperados:**
```sql
-- 1. Criar tabela
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INT DEFAULT 0,
    data_cadastro DATE DEFAULT CURRENT_DATE
);

-- 2. Adicionar coluna
ALTER TABLE produtos ADD descricao TEXT;

-- 3. Alterar tipo da coluna
ALTER TABLE produtos MODIFY preco DECIMAL(8, 2);

-- 4. Remover coluna
ALTER TABLE produtos DROP COLUMN quantidade_estoque;

-- 5. Excluir tabela
DROP TABLE produtos;
```

---

##  Atividade Prática: Pesquisa sobre Normalização

**Objetivo:** Compreender o conceito de normalização e sua aplicação no projeto de bancos de dados.

**Tarefa:**
Pesquise e elabore uma apresentação (slides) sobre o processo de normalização, contemplando:

1. **O que é normalização** — conceito e objetivo
2. **As formas normais e seus requisitos:**
   - 1ª Forma Normal (1FN)
   - 2ª Forma Normal (2FN)
   - 3ª Forma Normal (3FN)
   - BCNF (Boyce-Codd Normal Form)
3. **Vantagens** da normalização na eliminação de redundâncias e na garantia de integridade
4. **Exemplo prático:** transformar uma tabela não normalizada em 3ª Forma Normal

**Formato:**
- Slides (PowerPoint ou Google Slides)
- Títulos claros e uso de diagramas/gráficos
- Duração sugerida: 10 minutos

**Critérios de Avaliação:**
- Clareza na explicação dos conceitos
- Qualidade visual e organização dos slides
- Aplicação correta do processo de normalização no exemplo prático

---

##  Aplicabilidade

- **Sistemas de E-commerce:** Modelar entidades como `clientes`, `produtos`, `pedidos` e `categorias` antes de qualquer implementação
- **Sistemas Acadêmicos:** Estruturar entidades como `alunos`, `cursos` e `matrículas` com as cardinalidades corretas
- **ERPs e CRMs:** Projetar bancos com dezenas de entidades e relacionamentos usando MER antes de escrever SQL
- **Migração de sistemas:** Evoluir a estrutura de tabelas existentes com `ALTER TABLE` sem perder dados

---

##  Conexão com os Próximos Módulos

| Módulo | Tema | Conexão |
|--------|------|---------|
| **02** | **Estruturação (este módulo)** | Base para tudo que vem a seguir |
| 03 | DML — Manipulação de Dados | Inserir, consultar, atualizar e excluir dados nas tabelas criadas aqui |
| 04 | Relacionamentos entre Tabelas | Aprofundar FKs e cardinalidades apresentadas neste módulo |
| 05 | Consultas Avançadas (JOINs) | Combinar as tabelas estruturadas aqui em consultas complexas |

---

>  **Resumo:** O Módulo 02 é o ponto de partida essencial — sem uma boa modelagem (MER) e sem dominar os comandos DDL (`CREATE`, `DROP`, `ALTER`, `USE`), todos os módulos seguintes ficam sem fundação. Investir tempo no planejamento via MER e na correta definição de tipos de dados e restrições evita retrabalho, inconsistências e problemas de performance no futuro.