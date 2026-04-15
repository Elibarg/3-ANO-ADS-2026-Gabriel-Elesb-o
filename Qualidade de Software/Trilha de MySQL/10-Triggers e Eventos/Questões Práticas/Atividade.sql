-- 1. TRIGGER BEFORE (Validação de estoque)
DELIMITER //

CREATE TRIGGER valida_estoque
BEFORE INSERT ON pedido_produto
FOR EACH ROW
BEGIN
    DECLARE estoque_atual INT;

    -- Busca estoque atual do produto
    SELECT estoque INTO estoque_atual
    FROM produtos
    WHERE id_produto = NEW.id_produto;

    -- Valida se há estoque suficiente
    IF NEW.quantidade > estoque_atual THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente';
    END IF;

END //

DELIMITER ;

-- Comentário:
-- BEFORE = roda antes de inserir
-- NEW = valores que estão sendo inseridos
-- SIGNAL = força erro (validação)

-- 2. TRIGGER AFTER (Atualizar estoque)
DELIMITER //

CREATE TRIGGER atualiza_estoque
AFTER INSERT ON pedido_produto
FOR EACH ROW
BEGIN
    UPDATE produtos
    SET estoque = estoque - NEW.quantidade
    WHERE id_produto = NEW.id_produto;
END //

DELIMITER ;

-- Comentário:
-- AFTER = executa depois
-- Aqui garantimos consistência automática

-- 3. LOG DE EXCLUSÃO
CREATE TABLE log_acoes (
    acao VARCHAR(255),
    data_hora DATETIME
);

DELIMITER //

CREATE TRIGGER log_cliente_excluido
AFTER DELETE ON clientes
FOR EACH ROW
BEGIN
    INSERT INTO log_acoes (acao, data_hora)
    VALUES (CONCAT('Cliente excluído: ', OLD.id_cliente), NOW());
END //

DELIMITER ;

-- Comentário:
-- OLD = valor antigo (antes de deletar)

-- 4. EXCLUIR TRIGGER
DROP TRIGGER log_cliente_excluido;

-- Comentário:
-- Remove o trigger permanentemente

-- 5. EVENTO (Limpeza automática)
CREATE EVENT limpa_logs
ON SCHEDULE EVERY 1 DAY
STARTS '2026-01-01 23:59:00'
DO
DELETE FROM log_acoes
WHERE data_hora < NOW() - INTERVAL 60 DAY;

-- Comentário:
-- Executa todo dia
-- Remove logs antigos

-- 6. EVENTO (Relatório mensal)
CREATE EVENT gera_relatorio
ON SCHEDULE EVERY 1 MONTH
STARTS '2026-01-01 00:00:00'
DO
INSERT INTO relatorios (descricao, data_geracao)
VALUES ('Relatório mensal', NOW());

-- Comentário:
-- Automação total de relatórios

-- 7. ATIVAR EVENT SCHEDULER
SET GLOBAL event_scheduler = ON;

-- Verificar status
SHOW VARIABLES LIKE 'event_scheduler';

-- 8. MODIFICAR TRIGGER
-- Não existe ALTER TRIGGER → precisa recriar
DROP TRIGGER valida_estoque;

-- Criar novamente com nova regra

-- 9. TESTE DE PERFORMANCE
-- Simulação de carga
INSERT INTO pedido_produto (id_produto, quantidade)
VALUES (1, 1);

-- Comentário:
-- Se trigger for pesado → sistema fica lento

-- 10. DOCUMENTAÇÃO (EXEMPLO)
-- Evento: gera_relatorio
-- Objetivo: gerar relatório mensal automático
-- Frequência: mensal
-- Impacto: baixo
-- Benefício: elimina necessidade de script externo