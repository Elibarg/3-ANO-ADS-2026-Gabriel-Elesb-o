#  Módulo 08 — Backup, Restauração e Exportação de Dados
> **Trilha de Banco de Dados | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Backup e restauração são aspectos **críticos** para garantir a continuidade e a segurança de qualquer sistema. Este módulo cobre como criar cópias de segurança com `mysqldump`, como restaurar bancos a partir dessas cópias, como exportar e importar dados em formatos como CSV, e como automatizar o processo de backup.

---

##  Conteúdo

### 1. O que é Backup?

Backup é a criação de uma **cópia de segurança** dos dados e/ou da estrutura do banco de dados, protegendo o sistema contra:

- Falhas de hardware
- Erros humanos (exclusões acidentais, updates sem WHERE)
- Ataques (ex.: ransomware)
- Atualizações mal-sucedidas de sistema

---

### 2. Backup Lógico com `mysqldump`

O `mysqldump` é a ferramenta de linha de comando padrão do MySQL para criar backups dos dados e estruturas das tabelas. Ele gera um arquivo `.sql` com todos os comandos necessários para recriar o banco.

#### 2.1 Backup de um Banco Inteiro

```bash
mysqldump -u usuario -p nome_do_banco > backup.sql
```

**Parâmetros:**
| Parâmetro | Descrição |
|-----------|-----------|
| `-u usuario` | Especifica o usuário do MySQL |
| `-p` | Solicita a senha interativamente |
| `nome_do_banco` | Nome do banco a ser salvo |
| `> backup.sql` | Redireciona a saída para o arquivo |

---

#### 2.2 Backup de Tabelas Específicas

```bash
mysqldump -u usuario -p nome_do_banco tabela1 tabela2 > backup_tabelas.sql
```

---

#### 2.3 Backup de Todos os Bancos

```bash
mysqldump -u usuario -p --all-databases > backup_total.sql
```

---

### 3. Backup Completo vs. Backup Incremental

| Aspecto | Backup Completo | Backup Incremental |
|---------|----------------|-------------------|
| O que salva | Toda a estrutura e dados | Apenas as alterações desde o último backup |
| Espaço | Maior | Menor |
| Tempo | Mais longo | Mais rápido |
| Complexidade | Simples | Mais complexo |
| Uso ideal | Base inicial, antes de atualizações | Backups frequentes em produção |

**Backup incremental com logs binários:**
```bash
mysqlbinlog mysql-bin.000001 > backup_incremental.sql
```

>  **Aplicabilidade:**
> - **Backup completo:** antes de atualizar sistemas ou realizar manutenção
> - **Backup incremental:** para reduzir espaço e tempo em backups diários

---

### 4. Restauração de Banco de Dados

Restauração é o processo de **reverter o banco para o estado registrado** em um backup.

#### 4.1 Restaurar um Banco Específico

```bash
mysql -u usuario -p nome_do_banco < backup.sql
```

#### 4.2 Restaurar Todos os Bancos

```bash
mysql -u usuario -p < backup_total.sql
```

>  **Atenção:** A restauração **sobrescreve** os dados atuais pelo conteúdo do backup. Sempre confirme o banco de destino antes de executar.

---

### 5. Exportação de Dados

Diferente do backup, a exportação é usada para **compartilhar ou migrar dados** para outros sistemas, ferramentas de BI ou planilhas.

#### 5.1 `SELECT INTO OUTFILE` — Exportar para CSV

Exporta dados diretamente para um arquivo no servidor MySQL:

```sql
SELECT id_cliente, nome, email
INTO OUTFILE '/var/lib/mysql-files/clientes.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

**Parâmetros:**
| Parâmetro | Descrição |
|-----------|-----------|
| `FIELDS TERMINATED BY ','` | Separador de colunas (vírgula) |
| `ENCLOSED BY '"'` | Coloca os valores entre aspas |
| `LINES TERMINATED BY '\n'` | Quebra de linha entre registros |

---

### 6. Importação de Dados

#### 6.1 `LOAD DATA INFILE` — Importar CSV

Importa dados de um arquivo CSV para uma tabela existente:

```sql
LOAD DATA INFILE '/var/lib/mysql-files/clientes.csv'
INTO TABLE clientes
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

**Pré-requisitos:**
- O arquivo deve estar no servidor MySQL
- O usuário deve ter permissão de leitura no diretório

---

### 7. Automatização de Backups

Automatizar backups é essencial em ambientes de produção. No Linux, usa-se o **cron** para agendar tarefas:

```bash
# Formato: minuto hora dia_mês mês dia_semana comando
0 2 * * * mysqldump -u usuario -p nome_do_banco > /backups/backup_$(date +\%F).sql
```

**Explicação:**
- `0 2 * * *` → Executa todo dia às **02:00**
- `$(date +\%F)` → Gera nome de arquivo com a data atual (ex.: `backup_2026-04-15.sql`)

**Vantagens da automatização:**
- Elimina dependência de ação manual
- Garante backup mesmo em dias sem operação
- Permite backups datados para controle histórico

---

### 8. Boas Práticas de Backup

| Prática | Descrição |
|---------|-----------|
|  Testar restauração | Realize testes regulares para confirmar integridade |
|  Múltiplas cópias | Mantenha backups em locais diferentes (local + nuvem) |
|  Automação | Agende backups para não depender de ação manual |
|  Rotação | Defina política de retenção (ex.: 30 dias) |
|  Monitoramento | Verifique se os backups foram concluídos com sucesso |
|  Documentação | Registre o processo de restauração claramente |

---

##  Questões Práticas

1. Realize um backup completo do banco `biblioteca` para `biblioteca_backup.sql`
2. Crie um backup contendo apenas as tabelas `livros` e `autores`
3. Faça backup de todos os bancos do servidor em `backup_total.sql`
4. Habilite logs binários e explique como usá-los para backup incremental
5. Restaure o banco `biblioteca` a partir de `biblioteca_backup.sql`
6. Restaure todos os bancos a partir de `backup_total.sql`
7. Exporte a tabela `clientes` para `clientes.csv` com separadores corretos
8. Importe os dados do arquivo `clientes.csv` para a tabela `clientes`
9. Configure um cron job para backup diário às 2h em `/backups`
10. Faça upload do backup para um servidor de teste e restaure para verificar integridade

---

##  Questões Teóricas

1. Qual a importância de backups regulares? Quais os riscos sem eles?
2. Descreva o `mysqldump` e suas principais opções
3. Compare backup completo e incremental: vantagens e desvantagens
4. O que são logs binários no MySQL e como usá-los para backup incremental?
5. Explique o `LOAD DATA INFILE` e suas configurações necessárias
6. Como exportar dados com `SELECT INTO OUTFILE`?
7. Liste três boas práticas de backup e armazenamento
8. Por que testar regularmente a restauração de backups?
9. Por que o formato CSV é amplamente usado para exportação e integração?
10. Quais as vantagens de automatizar backups com cron? Quais cuidados tomar?

---

##  Aplicabilidade

- **E-commerce:** Backup diário de pedidos, clientes e produtos
- **Sistemas financeiros:** Backup com retenção longa + teste de restauração periódico
- **BI e Analytics:** Exportar dados para CSV/Excel para análise em Power BI ou Python
- **Migração de sistemas:** Usar `mysqldump` para migrar entre servidores ou versões

---

>  **Resumo:** Um bom plano de backup e restauração é a última linha de defesa contra perda de dados. Combine backup completo com incremental, automatize com cron, teste restaurações regularmente e mantenha cópias em locais distintos. A exportação via CSV complementa o backup ao permitir integração com sistemas externos.