-- =========================================
-- BASE DE DADOS
-- =========================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    cidade VARCHAR(50)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Inserindo dados
INSERT INTO clientes (nome, email, cidade) VALUES
('João Silva', 'joao@email.com', 'São Paulo'),
('Maria Souza', 'maria@email.com', 'Rio de Janeiro'),
('Carlos Lima', 'carlos@email.com', 'São Paulo');

INSERT INTO pedidos (id_cliente, valor_total) VALUES
(1, 100.00),
(1, 200.00),
(2, 300.00);

-- =========================================
-- 1. ÍNDICE SIMPLES
-- =========================================

-- Cria índice na coluna nome
CREATE INDEX idx_nome_cliente ON clientes(nome);

-- Comentário:
-- Agora consultas com WHERE nome = 'X' ficam mais rápidas
-- pois o banco não precisa varrer toda a tabela

-- =========================================
-- 2. ÍNDICE ÚNICO
-- =========================================

CREATE UNIQUE INDEX idx_email_cliente ON clientes(email);

-- Comentário:
-- Garante que não exista email duplicado
-- e melhora buscas por email

-- =========================================
-- 3. ÍNDICE COMPOSTO
-- =========================================

CREATE INDEX idx_nome_cidade ON clientes(nome, cidade);

-- Comentário:
-- Ideal para consultas como:
-- WHERE nome = 'João' AND cidade = 'São Paulo'
-- Ordem importa → (nome, cidade) ≠ (cidade, nome)

-- =========================================
-- 4. EXPLAIN (ANÁLISE DE PERFORMANCE)
-- =========================================

EXPLAIN SELECT * 
FROM clientes 
WHERE nome = 'João Silva';

-- Comentário:
-- type → tipo de busca (ideal: index)
-- key → índice utilizado
-- rows → quantas linhas foram analisadas
-- Extra → evitar "full table scan"

-- =========================================
-- 5. ÍNDICE EM JOIN
-- =========================================

CREATE INDEX idx_id_cliente_pedidos ON pedidos(id_cliente);

-- Consulta com JOIN
SELECT clientes.nome, pedidos.valor_total
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

-- Comentário:
-- Sem índice → lento (varre tabela inteira)
-- Com índice → busca direta

-- =========================================
-- 6. EVITANDO FULL TABLE SCAN
-- =========================================

-- RUIM (não usa índice)
SELECT * FROM clientes
WHERE UPPER(nome) = 'JOÃO SILVA';

-- BOM (usa índice)
SELECT * FROM clientes
WHERE nome = 'João Silva';

-- Comentário:
-- Funções na coluna impedem uso de índice

-- =========================================
-- 7. LIMIT (OTIMIZAÇÃO)
-- =========================================

SELECT * FROM clientes
ORDER BY nome
LIMIT 5;

-- Comentário:
-- Reduz quantidade de dados processados

-- =========================================
-- 8. ÍNDICE EM PRODUTOS
-- =========================================

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    categoria VARCHAR(50),
    preco DECIMAL(10,2)
);

CREATE INDEX idx_categoria ON produtos(categoria);
CREATE INDEX idx_preco ON produtos(preco);

-- Comentário:
-- Consultas por categoria/preço ficam rápidas

-- =========================================
-- 9. CONSULTA OTIMIZADA (JOIN + ÍNDICE)
-- =========================================

SELECT clientes.nome
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
WHERE pedidos.valor_total > 100;

-- Comentário:
-- Índices ajudam tanto no JOIN quanto no WHERE

-- =========================================
-- 10. EXPLAIN (IDENTIFICANDO GARGALO)
-- =========================================

EXPLAIN SELECT *
FROM clientes
WHERE cidade = 'São Paulo';

-- Se aparecer "full table scan" → falta índice