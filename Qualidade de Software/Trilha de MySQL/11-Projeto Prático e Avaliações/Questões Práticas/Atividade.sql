-- =========================================
-- TABELA CLIENTES
-- =========================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20)
);

-- Comentário:
-- PK = identifica cliente único

-- =========================================
-- TABELA PRODUTOS
-- =========================================

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    estoque INT
);

-- =========================================
-- TABELA PEDIDOS
-- =========================================

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    data_pedido DATETIME,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- =========================================
-- TABELA N:N (pedido_produto)
-- =========================================

CREATE TABLE pedido_produto (
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    PRIMARY KEY (id_pedido, id_produto),

    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE,

    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Comentário:
-- Aqui resolve relacionamento N:N