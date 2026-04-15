-- =========================================
-- 1. CRIAÇÃO DAS TABELAS (CLIENTES E PEDIDOS)
-- =========================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
    -- PRIMARY KEY garante identificação única (base de tudo)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    valor_total DECIMAL(10,2),

    -- FOREIGN KEY cria o relacionamento (1:N)
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    ON DELETE CASCADE -- Se apagar cliente → apaga pedidos automaticamente
    ON UPDATE CASCADE -- Se mudar ID → atualiza automaticamente
);

-- =========================================
-- 2. INSERÇÃO DE DADOS
-- =========================================

-- Inserindo clientes
INSERT INTO clientes (nome, email) VALUES
('João Silva', 'joao@email.com'),
('Maria Souza', 'maria@email.com'),
('Carlos Lima', 'carlos@email.com');

-- Inserindo pedidos vinculados
-- Note: id_cliente PRECISA existir (integridade referencial)
INSERT INTO pedidos (id_cliente, valor_total) VALUES
(1, 100.00),
(1, 200.00),
(2, 300.00),
(3, 150.00);

-- =========================================
-- 3. CONSULTA 1:N (LISTAR PEDIDOS DE UM CLIENTE)
-- =========================================

SELECT clientes.nome, pedidos.id_pedido, pedidos.valor_total
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
WHERE clientes.id_cliente = 1;

-- Aqui o JOIN conecta as tabelas usando a chave estrangeira

-- =========================================
-- 4. RELACIONAMENTO N:N (PRODUTOS E PEDIDOS)
-- =========================================

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2)
);

-- Tabela intermediária (ESSENCIAL para N:N)
CREATE TABLE pedido_produto (
    id_pedido INT,
    id_produto INT,
    quantidade INT,

    -- Chave composta evita duplicidade (mesmo produto no mesmo pedido duplicado)
    PRIMARY KEY (id_pedido, id_produto),

    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserindo produtos
INSERT INTO produtos (nome, preco) VALUES
('Notebook', 3000.00),
('Smartphone', 2000.00),
('Teclado', 150.00);

-- Inserindo relação N:N
INSERT INTO pedido_produto VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 1);

-- =========================================
-- 5. CONSULTA COMPLETA COM JOIN (MULTI-TABELAS)
-- =========================================

SELECT 
    clientes.nome,
    produtos.nome AS produto,
    pedido_produto.quantidade
FROM clientes
JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
JOIN pedido_produto ON pedidos.id_pedido = pedido_produto.id_pedido
JOIN produtos ON pedido_produto.id_produto = produtos.id_produto;

-- Aqui você está navegando entre 3 níveis de relacionamento

-- =========================================
-- 6. TESTE DE DELETE CASCADE
-- =========================================

-- Apagando cliente 1 → seus pedidos também serão removidos
DELETE FROM clientes WHERE id_cliente = 1;

-- =========================================
-- 7. TESTE DE UPDATE CASCADE
-- =========================================

-- Atualizando ID do cliente (exemplo didático)
UPDATE clientes SET id_cliente = 10 WHERE id_cliente = 2;

-- O banco automaticamente atualiza os pedidos relacionados

-- =========================================
-- 8. CONSULTA DE PRODUTOS DE UM PEDIDO
-- =========================================

SELECT pedidos.id_pedido, produtos.nome, pedido_produto.quantidade
FROM pedido_produto
JOIN pedidos ON pedido_produto.id_pedido = pedidos.id_pedido
JOIN produtos ON pedido_produto.id_produto = produtos.id_produto
WHERE pedidos.id_pedido = 1;