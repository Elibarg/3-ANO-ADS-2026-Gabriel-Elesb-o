#  Módulo 07 — Segurança e Controle de Acesso
> **Trilha de Banco de Dados | UniSENAI 2026**  

---

##  Sobre este Módulo

A segurança de dados é uma das prioridades em qualquer sistema de banco de dados. Este módulo aborda como **criar e gerenciar usuários**, como **conceder e revogar permissões** com granularidade, e quais **boas práticas de segurança** devem ser adotadas para proteger os dados contra acessos não autorizados.

---

##  Conteúdo

### 1. Gerenciamento de Usuários

O MySQL possui um sistema de controle de acesso baseado em **contas de usuário** associadas a um **host de origem**. Isso garante que apenas pessoas ou sistemas autorizados possam acessar o banco de dados.

---

#### 1.1 Criação de Usuários — `CREATE USER`

```sql
CREATE USER 'nome_usuario'@'host' IDENTIFIED BY 'senha';
```

**Parâmetros:**
| Parâmetro | Descrição |
|-----------|-----------|
| `nome_usuario` | Nome da conta de usuário |
| `host` | Origem permitida: `localhost` (apenas local) ou `%` (qualquer origem) |
| `senha` | Senha de autenticação |

**Exemplos:**
```sql
-- Usuário com acesso local apenas
CREATE USER 'usuario1'@'localhost' IDENTIFIED BY 'senha_forte123';

-- Usuário com acesso remoto (qualquer origem)
CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'senha_remota123';
```

---

#### 1.2 Alteração de Usuários — `ALTER USER`

Utilizado para modificar atributos do usuário, como a senha:

```sql
ALTER USER 'usuario1'@'localhost' IDENTIFIED BY 'nova_senha_forte456';
```

---

#### 1.3 Exclusão de Usuários — `DROP USER`

Remove permanentemente uma conta do MySQL:

```sql
DROP USER 'usuario_remoto'@'%';
```

---

### 2. Concessão e Revogação de Permissões

As permissões definem **o que cada usuário pode ou não fazer** no banco de dados.

---

#### 2.1 Comando `GRANT` — Conceder Permissões

```sql
GRANT tipo_de_permissao ON nome_do_banco.nome_da_tabela TO 'nome_usuario'@'host';
```

**Exemplos:**
```sql
-- Permissão de leitura em uma tabela específica
GRANT SELECT ON meu_banco.clientes TO 'usuario1'@'localhost';

-- Todas as permissões em um banco de dados
GRANT ALL PRIVILEGES ON meu_banco.* TO 'usuario1'@'localhost';
```

---

#### 2.2 Comando `REVOKE` — Revogar Permissões

```sql
REVOKE tipo_de_permissao ON nome_do_banco.nome_da_tabela FROM 'nome_usuario'@'host';
```

**Exemplo:**
```sql
-- Revogar permissão de leitura
REVOKE SELECT ON meu_banco.clientes FROM 'usuario1'@'localhost';
```

---

#### 2.3 Permissões Comuns

| Permissão | O que permite |
|-----------|--------------|
| `SELECT` | Consultar dados |
| `INSERT` | Inserir novos registros |
| `UPDATE` | Modificar registros existentes |
| `DELETE` | Remover registros |
| `CREATE` | Criar tabelas e bancos |
| `DROP` | Excluir tabelas e bancos |
| `ALL PRIVILEGES` | Todas as permissões acima |

---

### 3. Melhores Práticas de Segurança

#### 3.1 Senhas Fortes

Uma senha segura deve:
- Ter pelo menos **8 caracteres**
- Incluir **letras maiúsculas e minúsculas**
- Incluir **números**
- Incluir **símbolos especiais**

**Exemplo de senha forte:** `Senha$F0rte!2024`

**Ativar política de senhas fortes no MySQL:**
```sql
SET GLOBAL validate_password_policy = 'STRONG';
```

---

#### 3.2 Princípio do Menor Privilégio

Conceda ao usuário **apenas as permissões estritamente necessárias** para sua função.

```sql
-- Usuário de relatórios: apenas leitura
GRANT SELECT ON meu_banco.* TO 'leitor'@'localhost';

-- Usuário de produção: leitura em todo o banco
CREATE USER 'leitor_prod'@'%' IDENTIFIED BY 'senhaLeitor!';
GRANT SELECT ON producao.* TO 'leitor_prod'@'%';
```

---

#### 3.3 Restrição de Origem (Host)

Sempre especifique de onde o usuário pode se conectar:

```sql
-- Acesso restrito ao servidor local
CREATE USER 'usuario_local'@'localhost' IDENTIFIED BY 'senha123';

-- Acesso de qualquer IP (menos seguro — usar com cuidado)
CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'senha123';
```

---

#### 3.4 Evitar Usuários Compartilhados

Cada pessoa ou sistema deve ter **sua própria conta de usuário**. Isso facilita:
- Rastreamento de ações individuais (auditoria)
- Revogar acesso de uma conta específica sem afetar outras
- Identificar a origem de problemas

---

#### 3.5 Auditoria Regular

Revise periodicamente as contas e permissões existentes:

```sql
-- Listar todos os usuários
SELECT User, Host FROM mysql.user;

-- Ver permissões de um usuário específico
SHOW GRANTS FOR 'usuario1'@'localhost';
```

---

### 4. Aplicabilidade Prática

**Sistemas de Gestão de Vendas:**
```sql
-- Usuário com acesso apenas à tabela de pedidos
GRANT SELECT, INSERT ON loja.pedidos TO 'vendedor'@'localhost';
```

**Ambientes Multiusuário:**
```sql
-- Desenvolvedor: acesso a tabelas de teste
GRANT SELECT, INSERT, UPDATE, DELETE ON dev_banco.* TO 'dev'@'localhost';

-- Administrador: acesso total
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
```

**Ambientes de Produção:**
```sql
-- Usuário de leitura (relatórios)
CREATE USER 'leitor_prod'@'%' IDENTIFIED BY 'senhaLeitor!';
GRANT SELECT ON producao.* TO 'leitor_prod'@'%';

-- Usuário de escrita (aplicação)
CREATE USER 'app_user'@'%' IDENTIFIED BY 'senhaApp!';
GRANT SELECT, INSERT, UPDATE ON producao.* TO 'app_user'@'%';
```

---

### 5. Checklist de Segurança

| Item | Ação |
|------|------|
|  Senhas fortes | Usar política `STRONG` e senhas complexas |
|  Menor privilégio | Conceder apenas o necessário |
|  Restrição de host | Especificar sempre o host de acesso |
|  Sem usuários compartilhados | Uma conta por pessoa/sistema |
|  Auditoria periódica | Revisar contas e permissões regularmente |
|  Separar leitura e escrita | Usuários diferentes para leitura e alteração |

---

##  Questões Práticas

1. Crie `usuario_local` (acesso local) e `usuario_remoto` (acesso remoto)
2. Altere a senha de `usuario_local` para uma senha forte
3. Exclua o `usuario_remoto`
4. Conceda `SELECT` em `clientes` para `usuario_local`; e `ALL PRIVILEGES` no banco `loja` para `admin_user`
5. Revogue o `SELECT` em `clientes` de `usuario_local`
6. Crie `usuario_servidor` com acesso apenas local
7. Configure `relatorio_user` com `SELECT` apenas em `relatorios`
8. Liste todos os usuários e suas permissões
9. Ative a política de senhas fortes e aplique a `usuario_local`
10. Configure dois usuários em produção: um só leitura e outro com `INSERT`, `UPDATE` e `DELETE`

---

##  Questões Teóricas

1. Qual a diferença entre `GRANT` e `REVOKE`?
2. O que é o princípio do menor privilégio e por que é importante?
3. Quais as características de uma senha segura para banco de dados?
4. Por que evitar usuários compartilhados?
5. Quais os riscos de conceder permissões desnecessárias?
6. Como a restrição de host aumenta a segurança?
7. Descreva as permissões `SELECT`, `INSERT`, `UPDATE` e `DELETE`
8. O que é auditoria de usuários e permissões?
9. Boas práticas para ambientes multiusuário?
10. Como configurar usuários para uma equipe de desenvolvedores e outra de administradores?

---

##  Aplicabilidade

- **E-commerce:** Separar usuários de leitura (relatórios) dos de escrita (aplicação)
- **Sistemas bancários:** Controle rígido de quem pode ler/alterar dados financeiros
- **SaaS Multi-tenant:** Cada cliente com usuário e permissões isolados
- **Equipes de desenvolvimento:** Devs com acesso limitado ao banco de produção

---

>  **Resumo:** Segurança em banco de dados não é opcional. Gerenciar usuários com o princípio do menor privilégio, usar senhas fortes, restringir origens de acesso e realizar auditorias periódicas são práticas fundamentais para proteger dados sensíveis e garantir a conformidade com regulamentações como a LGPD.