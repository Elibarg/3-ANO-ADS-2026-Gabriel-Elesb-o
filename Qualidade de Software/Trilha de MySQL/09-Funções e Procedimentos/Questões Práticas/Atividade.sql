-- 1. CONCAT (Identificador único)
SELECT CONCAT(id_cliente, '-', nome) AS identificador
FROM clientes;

-- Comentário:
-- CONCAT junta valores (string)
-- Aqui criamos um "ID visual" combinando ID + nome
-- Muito usado em relatórios e logs

-- 2. SUBSTRING
SELECT SUBSTRING(nome, 1, 3) AS inicio_nome
FROM produtos;

-- Comentário:
-- Extrai parte da string
-- (1,3) → começa na posição 1 e pega 3 caracteres

-- 3. UPPER / LOWER
SELECT UPPER(nome) AS nome_maiusculo
FROM clientes;

-- Comentário:
-- Padroniza dados (ex: comparação, relatórios)

-- 4. DATA E HORA
SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS data_formatada;

-- Comentário:
-- NOW() → data + hora atual
-- DATE_FORMAT → transforma no formato desejado

-- 5. DATEDIFF
SELECT DATEDIFF(CURDATE(), data_pedido) AS dias_passados
FROM pedidos;

-- Comentário:
-- Calcula diferença entre datas
-- Muito usado em atraso de pedidos

-- 6. ROUND
SELECT ROUND(preco, 2) AS preco_arredondado
FROM produtos;

-- Comentário:
-- Arredonda para 2 casas decimais

-- 7. FLOOR / CEIL
SELECT 
    FLOOR(valor_total) AS arredonda_baixo,
    CEIL(valor_total) AS arredonda_cima
FROM pedidos;

-- Comentário:
-- FLOOR → sempre para baixo
-- CEIL → sempre para cima

-- 8. PROCEDURE (Inserir pedido)
DELIMITER //

CREATE PROCEDURE inserir_pedido(
    IN cliente_id INT,
    IN data_pedido DATE
)
BEGIN
    INSERT INTO pedidos (id_cliente, data_pedido)
    VALUES (cliente_id, data_pedido);
END //

DELIMITER ;

-- Comentário:
-- Procedure = bloco reutilizável
-- IN → parâmetro de entrada
-- Evita repetir código no sistema

-- 9. EXECUTAR PROCEDURE
CALL inserir_pedido(1, '2026-01-01');

-- Comentário:
-- CALL executa o procedimento

-- 10. FUNÇÃO CUSTOMIZADA (UDF)
DELIMITER //

CREATE FUNCTION calcular_desconto(
    valor DECIMAL(10,2),
    desconto DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN valor - (valor * desconto / 100);
END //

DELIMITER ;

-- Comentário:
-- Função retorna UM valor
-- Pode ser usada em SELECT

-- 11. USAR FUNÇÃO
SELECT calcular_desconto(200, 10) AS valor_final;

-- Resultado esperado: 180