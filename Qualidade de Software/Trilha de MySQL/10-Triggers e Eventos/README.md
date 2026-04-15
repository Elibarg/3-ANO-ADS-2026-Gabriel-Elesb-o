#  Módulo 10 — Triggers e Eventos
> **Trilha de Banco de Dados | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Triggers e eventos são **mecanismos de automação interna** do MySQL. Os triggers reagem automaticamente a mudanças nos dados (INSERT, UPDATE, DELETE), enquanto os eventos são tarefas agendadas que executam em horários programados. Juntos, eles eliminam dependências externas e garantem que regras de negócio sejam aplicadas consistentemente.

---

##  Conteúdo

### 1. Triggers

#### 1.1 O que são Triggers?

Um **trigger** é um procedimento armazenado especial que é executado **automaticamente** quando ocorre um evento específico em uma tabela.

**Eventos que disparam triggers:**
- `INSERT` — Inserção de novos registros
- `UPDATE` — Atualização de registros existentes
- `DELETE` — Exclusão de registros

**Características importantes:**
- Estão **associados diretamente** a uma tabela
- **Não podem ser executados manualmente** — só disparam via eventos
- Executam para **cada linha afetada** (`FOR EACH ROW`)

---

#### 1.2 Vantagens dos Triggers

- Automatizam processos internos sem necessidade de código na aplicação
- Mantêm a integridade dos dados de forma transparente
- Garantem que regras sejam aplicadas independentemente de onde a operação ocorre
- Reduzem a dependência de código externo

---

#### 1.3 Sintaxe de Criação

```sql
CREATE TRIGGER nome_trigger
{BEFORE | AFTER} {INSERT | UPDATE | DELETE}
ON nome_da_tabela
FOR EACH ROW
corpo_do_trigger;
```

**Momento de execução:**
| Momento | Descrição |
|---------|-----------|
| `BEFORE` | Executado **antes** da operação — ideal para validações |
| `AFTER` | Executado **após** a operação — ideal para ações consequentes |

**Referência aos dados:**
| Referência | Descrição |
|-----------|-----------|
| `NEW.coluna` | Valor novo (em INSERT e UPDATE) |
| `OLD.coluna` | Valor anterior (em UPDATE e DELETE) |

---

#### 1.4 Exemplos Práticos

**Trigger AFTER INSERT — Registrar log ao inserir pedido:**
```sql
CREATE TRIGGER log_pedido_inserido
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    INSERT INTO log_acoes (acao, data_hora)
    VALUES ('Pedido inserido', NOW());
END;
```

**Trigger BEFORE INSERT — Validar estoque antes de aceitar pedido:**
```sql
CREATE TRIGGER valida_estoque
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.quantidade <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'A quantidade deve ser maior que zero.';
    END IF;
END;
```

**Trigger AFTER INSERT — Atualizar estoque após uma venda:**
```sql
CREATE TRIGGER atualiza_estoque
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
    UPDATE produtos
    SET estoque = estoque - NEW.quantidade
    WHERE id_produto = NEW.id_produto;
END;
```

**Trigger AFTER DELETE — Log de clientes excluídos:**
```sql
CREATE TRIGGER log_usuario_excluido
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO log_acoes (acao, data_hora)
    VALUES (CONCAT('Usuário excluído: ', OLD.nome), NOW());
END;
```

---

#### 1.5 Exclusão de Triggers

```sql
DROP TRIGGER log_pedido_inserido;
```

---

#### 1.6 Tipos de Triggers — Resumo

| Tipo | Quando executa | Uso comum |
|------|---------------|-----------|
| `BEFORE INSERT` | Antes de inserir | Validar dados |
| `AFTER INSERT` | Após inserir | Atualizar tabelas relacionadas, criar logs |
| `BEFORE UPDATE` | Antes de atualizar | Validar novos valores |
| `AFTER UPDATE` | Após atualizar | Registrar histórico de mudanças |
| `BEFORE DELETE` | Antes de excluir | Verificar dependências |
| `AFTER DELETE` | Após excluir | Registrar log da exclusão |

---

### 2. Eventos (Event Scheduler)

#### 2.1 O que são Eventos no MySQL?

Um **evento** é uma tarefa agendada que é executada automaticamente em um **horário específico** ou em **intervalos regulares**. Funciona como um `cron` interno do banco de dados.

**Vantagens:**
- Automatizam tarefas recorrentes sem scripts externos
- Ideal para manutenção periódica (limpeza de logs, geração de relatórios)
- Executam dentro do contexto do banco, com acesso direto às tabelas

---

#### 2.2 Ativação do Event Scheduler

Por padrão, o agendador pode estar **desativado**. Para ativar:

```sql
SET GLOBAL event_scheduler = ON;

-- Verificar status
SHOW VARIABLES LIKE 'event_scheduler';
```

---

#### 2.3 Sintaxe de Criação

```sql
CREATE EVENT nome_evento
ON SCHEDULE {AT data_hora | EVERY intervalo}
DO
comando_sql;
```

**Opções de agendamento:**
| Opção | Descrição |
|-------|-----------|
| `AT '2026-04-15 02:00:00'` | Executa uma vez em data/hora específica |
| `EVERY 1 DAY` | Executa a cada 1 dia |
| `EVERY 1 HOUR` | Executa a cada 1 hora |
| `EVERY 1 MONTH` | Executa a cada 1 mês |
| `STARTS '2024-01-01'` | Define quando começa |

---

#### 2.4 Exemplos Práticos

**Limpeza automática de logs antigos (diariamente):**
```sql
CREATE EVENT limpa_logs
ON SCHEDULE EVERY 1 DAY
DO
DELETE FROM log_acoes WHERE data_hora < NOW() - INTERVAL 30 DAY;
```

**Relatório mensal automático (todo dia 1º):**
```sql
CREATE EVENT gera_relatorio_vendas
ON SCHEDULE EVERY 1 MONTH
STARTS '2024-01-01 00:00:00'
DO
INSERT INTO relatorios (descricao, data_geracao)
VALUES ('Relatório mensal de vendas', NOW());
```

**Limpeza de carrinhos abandonados (e-commerce):**
```sql
CREATE EVENT limpa_carrinhos
ON SCHEDULE EVERY 1 DAY
DO
DELETE FROM carrinhos WHERE data_criacao < NOW() - INTERVAL 1 DAY;
```

---

### 3. Melhores Práticas

#### 3.1 Checklist para Triggers

-  Manter triggers **simples e bem documentados**
-  Evitar **lógica complexa** que dificulte a manutenção
-  **Testar** em ambiente de homologação antes de produção
-  **Monitorar** o impacto na performance
-  **Documentar** claramente a finalidade de cada trigger

#### 3.2 Checklist para Eventos

-  Usar apenas para tarefas **realmente periódicas**
-  Verificar se o `event_scheduler` está **habilitado** antes de confiar em eventos
-  Testar o SQL do evento manualmente antes de agendá-lo
-  Monitorar a execução e verificar logs de erro

---

### 4. Quando NÃO Usar Triggers ou Eventos

| Situação | Motivo |
|----------|--------|
| Regras complexas de negócio | Difíceis de manter e debugar no BD |
| Lógica com múltiplas tabelas e fluxos | Aumenta o risco de erros em cascata |
| Processos com controle detalhado de erro | Triggers têm tratamento de erro limitado |
| Lógica exclusiva da aplicação | Misturar camadas dificulta manutenção |

---

##  Questões Práticas

1. Crie um trigger `BEFORE INSERT` que valide se a quantidade de um pedido é ≤ ao estoque
2. Crie um trigger `AFTER INSERT` que atualize o estoque após novo pedido em `pedido_produto`
3. Crie um trigger que registre em `log_acoes` toda exclusão de `clientes` (com data/hora e ID)
4. Exclua o trigger de log de clientes com `DROP TRIGGER`
5. Crie um evento para limpar `log_acoes` com mais de 60 dias, executado diariamente às 23h59
6. Configure um evento para gerar relatório mensal de vendas todo dia 1º à meia-noite
7. Ative o agendador de eventos e verifique seu funcionamento
8. Modifique um trigger existente para incluir validação de um novo campo
9. Execute um teste de performance em um trigger frequente e proponha melhorias
10. Documente detalhadamente um evento de relatório automático

---

##  Questões Teóricas

1. O que são triggers e quais suas vantagens?
2. Diferença entre triggers `BEFORE` e `AFTER`?
3. Liste três vantagens de eventos em relação a cron jobs externos
4. Como um trigger pode validar dados antes de uma operação?
5. Quais cuidados tomar para não degradar performance com triggers?
6. Como eventos automatizam a manutenção do banco?
7. Por que o `event_scheduler` pode estar desativado e como ativá-lo?
8. Sintaxe para excluir um trigger — o que acontece com os dados após a exclusão?
9. Quais as melhores práticas para criação de triggers?
10. Quando um evento mal configurado pode causar problemas?

---

##  Aplicabilidade

- **E-commerce:** Limpar carrinhos abandonados, atualizar estoque após venda
- **Sistemas Financeiros:** Log de alterações em transações para auditoria
- **RH:** Registrar histórico de mudanças salariais automaticamente
- **Monitoramento:** Alertar quando estoque atingir nível mínimo
- **Manutenção:** Limpeza periódica de logs e dados temporários

---

>  **Resumo:** Triggers e eventos são ferramentas poderosas para automação interna do banco. Triggers reagem a mudanças nos dados em tempo real, enquanto eventos executam tarefas em horários programados. Use-os com moderação, mantenha a lógica simples e sempre documente claramente o propósito de cada um.