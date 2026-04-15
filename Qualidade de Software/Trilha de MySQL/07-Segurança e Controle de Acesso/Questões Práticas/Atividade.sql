-- =========================================
-- 1. CRIAÇÃO DE USUÁRIOS
-- =========================================

-- Usuário local (só acessa do próprio servidor)
CREATE USER 'usuario_local'@'localhost' IDENTIFIED BY 'SenhaForte@123';

-- Usuário remoto (pode acessar de qualquer lugar)
CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'SenhaRemota@123';

-- Comentário:
-- 'localhost' = acesso restrito
-- '%' = acesso aberto (cuidado!)

-- =========================================
-- 2. ALTERAÇÃO DE SENHA
-- =========================================

ALTER USER 'usuario_local'@'localhost' IDENTIFIED BY 'NovaSenha@Segura2024';

-- Comentário:
-- Sempre usar senha forte (mínimo 8 caracteres, símbolos, etc.)

-- =========================================
-- 3. EXCLUSÃO DE USUÁRIO
-- =========================================

DROP USER 'usuario_remoto'@'%';

-- Comentário:
-- Remove completamente o acesso

-- =========================================
-- 4. CONCESSÃO DE PERMISSÕES (GRANT)
-- =========================================

-- Permissão de leitura na tabela clientes
GRANT SELECT ON meu_banco.clientes TO 'usuario_local'@'localhost';

-- Permissão total no banco loja
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'Admin@123';
GRANT ALL PRIVILEGES ON loja.* TO 'admin_user'@'localhost';

-- Comentário:
-- SELECT → só leitura
-- ALL → controle total

-- =========================================
-- 5. REVOGAÇÃO DE PERMISSÕES (REVOKE)
-- =========================================

REVOKE SELECT ON meu_banco.clientes FROM 'usuario_local'@'localhost';

-- Comentário:
-- Remove acesso concedido anteriormente

-- =========================================
-- 6. USUÁRIO COM RESTRIÇÃO DE HOST
-- =========================================

CREATE USER 'usuario_servidor'@'localhost' IDENTIFIED BY 'Servidor@123';

-- Comentário:
-- Só pode acessar localmente (mais seguro)

-- =========================================
-- 7. PRINCÍPIO DO MENOR PRIVILÉGIO
-- =========================================

CREATE USER 'relatorio_user'@'localhost' IDENTIFIED BY 'Relatorio@123';

GRANT SELECT ON meu_banco.relatorios TO 'relatorio_user'@'localhost';

-- Comentário:
-- Usuário só pode ler → não pode alterar nada

-- =========================================
-- 8. AUDITORIA DE USUÁRIOS
-- =========================================

SELECT user, host FROM mysql.user;

-- Ver permissões:
SHOW GRANTS FOR 'usuario_local'@'localhost';

-- Comentário:
-- Auditoria = saber quem tem acesso ao quê

-- =========================================
-- 9. POLÍTICA DE SENHAS
-- =========================================

SET GLOBAL validate_password_policy = 'STRONG';

-- Comentário:
-- Força uso de senhas seguras

-- =========================================
-- 10. AMBIENTE DE PRODUÇÃO
-- =========================================

-- Usuário somente leitura
CREATE USER 'leitor'@'%' IDENTIFIED BY 'Leitor@123';
GRANT SELECT ON producao.* TO 'leitor'@'%';

-- Usuário com escrita
CREATE USER 'editor'@'%' IDENTIFIED BY 'Editor@123';
GRANT INSERT, UPDATE, DELETE ON producao.* TO 'editor'@'%';

-- Comentário:
-- Separar leitura e escrita evita desastre