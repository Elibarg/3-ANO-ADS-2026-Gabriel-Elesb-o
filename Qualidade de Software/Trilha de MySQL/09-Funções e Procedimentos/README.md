#  Módulo 09 — Funções e Procedimentos Armazenados
> **Trilha de Banco de Dados | UniSENAI 2026**  

---

##  Sobre este Módulo

Funções e procedimentos armazenados permitem **encapsular lógica diretamente no banco de dados**, automatizar tarefas repetitivas e aplicar regras de negócio de forma centralizada. Este módulo cobre as funções nativas do MySQL, os Stored Procedures e as User-Defined Functions (UDFs).

---

##  Conteúdo

### 1. Funções Nativas do MySQL

O MySQL oferece um conjunto rico de funções embutidas para manipulação de strings, cálculos matemáticos e operações com datas.

---

#### 1.1 Funções de Manipulação de Strings

**`CONCAT` — Concatenar strings:**
```sql
SELECT CONCAT('Olá, ', 'Mundo!') AS saudacao;
-- Resultado: Olá, Mundo!
```

**`SUBSTRING` — Extrair parte de uma string:**
```sql
SELECT SUBSTRING('MySQL é poderoso', 7, 2) AS extrato;
-- Resultado: é
```

**`LOWER` e `UPPER` — Converter maiúsculas/minúsculas:**
```sql
SELECT LOWER('MySQL') AS minusculas, UPPER('mysql') AS maiusculas;
-- Resultado: mysql | MYSQL
```

**Aplicação prática — Gerar identificadores únicos:**
```sql
SELECT CONCAT(id_cliente, '-', LOWER(nome)) AS identificador FROM clientes;
```

---

#### 1.2 Funções de Data e Hora

**`NOW()` — Data e hora atuais:**
```sql
SELECT NOW() AS data_hora_atual;
-- Resultado: 2026-04-15 14:30:45
```

**`CURDATE()` — Data atual (sem hora):**
```sql
SELECT CURDATE() AS data_atual;
```

**`DATE_FORMAT()` — Formatar data:**
```sql
SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS data_formatada;
-- Resultado: 15/04/2026 14:30:45
```

**`DATEDIFF()` — Diferença em dias entre duas datas:**
```sql
SELECT DATEDIFF('2024-12-31', '2024-12-25') AS diferenca_dias;
-- Resultado: 6
```

**Aplicação prática — Pedidos atrasados:**
```sql
SELECT id_pedido, DATEDIFF(CURDATE(), data_pedido) AS dias_atraso
FROM pedidos
WHERE status = 'atrasado';
```

---

#### 1.3 Funções Matemáticas

**`ROUND()` — Arredondar:**
```sql
SELECT ROUND(123.456, 2) AS arredondado;
-- Resultado: 123.46
```

**`FLOOR()` e `CEIL()` — Arredondar para baixo/cima:**
```sql
SELECT FLOOR(123.456) AS para_baixo, CEIL(123.456) AS para_cima;
-- Resultado: 123 | 124
```

**`ABS()` — Valor absoluto:**
```sql
SELECT ABS(-50) AS absoluto;
-- Resultado: 50
```

---

### 2. Procedimentos Armazenados (Stored Procedures)

#### 2.1 O que são?

Um **procedimento armazenado** é um conjunto de instruções SQL salvo no banco de dados que pode ser executado como uma unidade.

**Vantagens:**
- Redução de redundância de código
- Melhoria na performance (código compilado no servidor)
- Maior segurança com controle de acesso
- Centralização da lógica de negócio

---

#### 2.2 Sintaxe Geral

```sql
CREATE PROCEDURE nome_procedimento(parametros)
BEGIN
    corpo_do_procedimento;
END;
```

**Tipos de parâmetros:**
| Tipo | Descrição |
|------|-----------|
| `IN` | Parâmetro de entrada (valor passado para o procedimento) |
| `OUT` | Parâmetro de saída (valor retornado pelo procedimento) |
| `INOUT` | Parâmetro de entrada e saída |

---

#### 2.3 Exemplo Prático

**Criar um procedimento que lista pedidos de um cliente:**
```sql
CREATE PROCEDURE listar_pedidos_cliente(IN cliente_id INT)
BEGIN
    SELECT * FROM pedidos WHERE id_cliente = cliente_id;
END;
```

**Executar o procedimento:**
```sql
CALL listar_pedidos_cliente(1);
```

---

### 3. Funções Definidas pelo Usuário (UDFs)

#### 3.1 O que são UDFs?

As **User-Defined Functions (UDFs)** permitem criar funções personalizadas que:
- Retornam **um único valor**
- Podem ser usadas em `SELECT`, `WHERE`, `ORDER BY`

>  **Diferença importante:** Funções **não devem alterar dados**. Para modificar dados, use Stored Procedures.

---

#### 3.2 Sintaxe Geral

```sql
CREATE FUNCTION nome_funcao(parametros)
RETURNS tipo_de_retorno
DETERMINISTIC
BEGIN
    corpo_da_funcao;
    RETURN valor;
END;
```

>  `DETERMINISTIC` indica que a função sempre retorna o mesmo resultado para os mesmos parâmetros de entrada.

---

#### 3.3 Exemplo Prático

**Função que calcula o valor com desconto:**
```sql
CREATE FUNCTION calcular_desconto(valor DECIMAL(10,2), desconto DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN valor - (valor * desconto / 100);
END;
```

**Usando a função em uma consulta:**
```sql
SELECT calcular_desconto(200, 10) AS valor_com_desconto;
-- Resultado: 180.00
```

---

### 4. Diferença entre `FUNCTION` e `PROCEDURE`

| Aspecto | `FUNCTION` | `PROCEDURE` |
|---------|------------|------------|
| Retorno | Obrigatório (1 valor) | Opcional |
| Uso em `SELECT` | Sim | Não |
| Altera dados | Não recomendado | Sim |
| Execução | Dentro de consultas | Via `CALL` |

---

##  Questões Práticas

1. Use `CONCAT` para gerar identificador único combinando nome e ID do cliente
2. Extraia os 3 primeiros caracteres do nome de um produto com `SUBSTRING`
3. Converta todos os nomes de clientes para maiúsculas com `UPPER`
4. Use `NOW()` com `DATE_FORMAT` para exibir data no formato DD/MM/AAAA HH:MM:SS
5. Calcule a diferença de dias entre hoje e a data de um pedido com `DATEDIFF`
6. Arredonde preços para 2 casas decimais com `ROUND`
7. Use `FLOOR` e `CEIL` em um campo de total de vendas
8. Crie uma Stored Procedure para inserir um novo pedido recebendo `id_cliente` e `data_pedido`
9. Execute o procedimento criado com parâmetros
10. Crie uma UDF que calcula o total de um pedido com desconto percentual

---

##  Questões Teóricas

1. O que são funções no MySQL e quais os tipos mais comuns?
2. Como `CONCAT` pode ser usado para manipular dados em relatórios?
3. Qual a diferença entre `NOW()` e `CURDATE()`?
4. Qual a diferença entre `ROUND`, `FLOOR` e `CEIL`?
5. Liste três vantagens de Stored Procedures
6. Qual a diferença entre `IN`, `OUT` e `INOUT` em procedimentos?
7. Qual comando executa um procedimento armazenado?
8. O que são UDFs e como diferem de Stored Procedures?
9. Quando criar uma UDF em vez de usar uma função padrão?
10. Compare funções e procedimentos em termos de retorno e uso em consultas

---

##  Aplicabilidade

- **Funções de String:** Gerar identificadores, formatar relatórios, normalizar dados
- **Funções de Data:** Calcular vencimentos, prazos, tempo desde o cadastro
- **Funções Matemáticas:** Relatórios financeiros, margens de lucro, cálculo de impostos
- **Stored Procedures:** Registrar pedidos com atualização de estoque, gerar relatórios automáticos
- **UDFs:** Reutilizar cálculos personalizados (descontos, taxas) em múltiplas consultas

---

>  **Resumo:** Funções e procedimentos armazenados transformam o banco de dados de um simples repositório em um **motor de lógica de negócio**. Usar as funções nativas corretamente, criar Stored Procedures para operações complexas e desenvolver UDFs para cálculos reutilizáveis são habilidades que elevam significativamente a qualidade e eficiência dos sistemas.