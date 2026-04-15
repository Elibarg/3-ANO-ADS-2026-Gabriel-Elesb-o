-- =========================================
-- BASE DE DADOS (necessária para os exercícios)
-- =========================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

INSERT INTO clientes (nome) VALUES
('João Silva'),
('Maria Souza'),
('Ana Oliveira');

INSERT INTO pedidos (id_cliente, valor_total) VALUES
(1, 150.00),
(2, 200.00),
(1, 300.00);

-- =========================================
-- 1. INNER JOIN
-- =========================================

-- Retorna apenas quem TEM pedido
SELECT clientes.nome, pedidos.valor_total
FROM clientes
INNER JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

-- Lógica: interseção entre tabelas

-- =========================================
-- 2. LEFT JOIN
-- =========================================

-- Retorna TODOS clientes (mesmo sem pedido)
SELECT clientes.nome, pedidos.valor_total
FROM clientes
LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

-- Lógica: preserva tabela da esquerda

-- =========================================
-- 3. RIGHT JOIN
-- =========================================

-- Retorna TODOS pedidos (mesmo sem cliente válido)
SELECT clientes.nome, pedidos.valor_total
FROM clientes
RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

-- Lógica: preserva tabela da direita

-- =========================================
-- 4. FULL OUTER JOIN (emulação)
-- =========================================

SELECT clientes.nome, pedidos.valor_total
FROM clientes
LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente

UNION

SELECT clientes.nome, pedidos.valor_total
FROM clientes
RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

-- MySQL não tem FULL OUTER JOIN nativo → usamos UNION

-- =========================================
-- 5. SUBCONSULTA (SELECT)
-- =========================================

-- Cliente com maior pedido
SELECT nome
FROM clientes
WHERE id_cliente = (
    SELECT id_cliente
    FROM pedidos
    ORDER BY valor_total DESC
    LIMIT 1
);

-- Lógica: primeiro descobre quem tem maior valor, depois busca nome

-- =========================================
-- 6. SUBCONSULTA (INSERT)
-- =========================================

INSERT INTO pedidos (id_cliente, valor_total)
VALUES (
    (SELECT id_cliente FROM pedidos ORDER BY valor_total DESC LIMIT 1),
    500.00
);

-- Lógica: usa resultado de uma consulta dentro de outra

-- =========================================
-- 7. SUBCONSULTA CORRELACIONADA
-- =========================================

SELECT nome,
(
    SELECT SUM(valor_total)
    FROM pedidos
    WHERE pedidos.id_cliente = clientes.id_cliente
) AS total_pedidos
FROM clientes;

-- Lógica: executa a subconsulta PARA CADA cliente

-- =========================================
-- 8. COUNT
-- =========================================

SELECT COUNT(*) AS total_pedidos
FROM pedidos;

-- Conta quantos registros existem

-- =========================================
-- 9. GROUP BY
-- =========================================

SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
GROUP BY clientes.nome;

-- Agrupa por cliente

-- =========================================
-- 10. GROUP BY + HAVING
-- =========================================

SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
GROUP BY clientes.nome
HAVING total_vendas > 200;

-- HAVING filtra depois do agrupamento