-- =========================================
-- CRIAÇÃO DA TABELA
-- =========================================

-- Criamos a tabela funcionarios com os campos exigidos
CREATE TABLE funcionarios (
    id_funcionario INT PRIMARY KEY, -- Identificador único (chave primária)
    nome VARCHAR(100),              -- Nome do funcionário
    email VARCHAR(100),             -- Email do funcionário
    cargo VARCHAR(50),              -- Cargo ocupado
    cidade VARCHAR(50) DEFAULT 'Não Informado' -- Valor padrão
);

-- =========================================
-- INSERÇÃO DE 3 REGISTROS
-- =========================================

-- Inserção simples de dados
INSERT INTO funcionarios (id_funcionario, nome, email, cargo)
VALUES 
(1, 'João Silva', 'joao@email.com', 'Analista'),
(2, 'Maria Souza', 'maria@email.com', 'Gerente'),
(3, 'Carlos Lima', 'carlos@email.com', 'Analista');

-- =========================================
-- INSERÇÃO DE MÚLTIPLOS REGISTROS
-- =========================================

-- Inserção de vários registros em uma única operação (mais eficiente)
INSERT INTO funcionarios (id_funcionario, nome, email, cargo)
VALUES 
(4, 'Ana Costa', 'ana@email.com', 'Analista'),
(5, 'Pedro Alves', 'pedro@email.com', 'Desenvolvedor'),
(6, 'Lucas Rocha', 'lucas@email.com', 'Analista'),
(7, 'Fernanda Lima', 'fernanda@email.com', 'RH'),
(8, 'Bruno Souza', 'bruno@email.com', 'Gerente');

-- =========================================
-- INSERÇÃO COM DEFAULT
-- =========================================

-- Aqui NÃO informamos cidade → o banco usa o valor padrão
INSERT INTO funcionarios (id_funcionario, nome, email, cargo)
VALUES (9, 'Juliana Mendes', 'juliana@email.com', 'Analista');

-- =========================================
-- SELECT COM WHERE
-- =========================================

-- Filtra apenas funcionários com cargo = 'Analista'
SELECT * 
FROM funcionarios
WHERE cargo = 'Analista';

-- =========================================
-- ORDER BY
-- =========================================

-- Ordena os funcionários pelo nome (ordem alfabética)
SELECT * 
FROM funcionarios
ORDER BY nome ASC;

-- =========================================
-- LIMIT
-- =========================================

-- Retorna apenas os 3 primeiros registros
SELECT * 
FROM funcionarios
LIMIT 3;

-- =========================================
-- DISTINCT
-- =========================================

-- Lista cidades únicas (remove duplicados)
SELECT DISTINCT cidade
FROM funcionarios;

-- =========================================
-- GROUP BY
-- =========================================

-- Agrupa por cargo e conta quantos existem
SELECT cargo, COUNT(*) AS total_funcionarios
FROM funcionarios
GROUP BY cargo;

-- =========================================
-- UPDATE
-- =========================================

-- Atualiza TODOS os funcionários chamados João
UPDATE funcionarios
SET cargo = 'Coordenador'
WHERE nome LIKE 'João%';

-- =========================================
-- DELETE
-- =========================================

-- Remove funcionários com cargo Analista
DELETE FROM funcionarios
WHERE cargo = 'Analista';