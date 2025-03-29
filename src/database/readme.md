<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="../../documentos/img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="../../documentos/img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: LinkUp

## Nome do Grupo: LinkUp

## Banco de Dados: Estrutura e Scripts

## Índice
- [Visão Geral do Banco de Dados](#-visão-geral-do-banco-de-dados)
- [Dicionário de Dados](#-dicionário-de-dados)
- [Passo a Passo para Criar o Banco de Dados](#-passo-a-passo-para-criar-o-banco-de-dados)
- [Script `schema.sql`](#-script-schemasql)
  - [Tabela `Usuario`](#tabela-usuario)
  - [Tabela `Profissional`](#tabela-profissional)
  - [Tabela `Aluno`](#tabela-aluno)
  - [Tabela `Tecnologia_Assistiva`](#tabela-tecnologia_assistiva)
  - [Tabela `Atendimento`](#tabela-atendimento)
- [Relacionamentos](#-relacionamentos)
- [Script `create_database.sql`](#-script-seedsql)
  - [Dados Inseridos](#-dados-inseridos)
- [Dependências](#dependências)

## Visão Geral do Banco de Dados
O banco de dados do projeto LinkUp foi modelado para gerenciar informações de alunos, profissionais, atendimentos e tecnologias assistivas. Abaixo está a estrutura física implementada no script `create_database.sql`.

<div align="center">
  <sub>Figura 1 - Modelo Conceitual do Banco de Dados</sub><br>
  <img src="../../documentos/img/modelo-conceitual.jpg" width="80%"><br>
  <sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

## Dicionário de Dados
O dicionário de dados descreve a estrutura, tipos, restrições e relacionamentos das tabelas do banco.

### **Tabela `Usuario`**
| Campo    | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|---------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`    | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do usuário.          | -               |
| `nome`  | `VARCHAR(255)`| `NOT NULL`               | Nome completo do usuário.                | -               |
| `email` | `VARCHAR(255)`| `NOT NULL, UNIQUE`       | Email institucional (único por usuário). | -               |
| `senha` | `VARCHAR(255)`| `NOT NULL`               | Senha criptografada (hash).              | -               |
| `cargo` | `VARCHAR(255)`| `NOT NULL`               | Cargo (ex: `Gerente Administrativo`).    | -               |

### **Tabela `Profissional`**
| Campo          | Tipo          | Restrições               | Descrição                                | Relacionamentos           |
|----------------|---------------|--------------------------|------------------------------------------|---------------------------|
| `id`           | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do profissional.     | Atendimento (`1:N`)       |
| `nome`         | `VARCHAR(255)`| `NOT NULL`               | Nome do profissional.                   | -                         |
| `email`        | `VARCHAR(255)`| `NOT NULL, UNIQUE`       | Email institucional (único).            | -                         |
| `ocupacao`     | `VARCHAR(255)`| `NOT NULL`               | Ocupação do profissional.               | -                         |
| `ativo`        | `BOOLEAN`     | `NOT NULL`               | Status de atividade.                    | -                         |
| `dataCadastro` | `DATETIME`    | `NOT NULL`               | Data de cadastro do profissional.       | -                         |

### **Tabela `Tecnologia_Assistiva`**
| Campo    | Tipo          | Restrições               | Descrição                                       | Relacionamentos                     |
|---------|---------------|--------------------------|-------------------------------------------------|-------------------------------------|
| `id`    | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único da tecnologia assistiva.    | Aluno_Tecnologia_Assistiva (`1:N`) |
| `nome`  | `VARCHAR(255)`| `NOT NULL, UNIQUE`       | Nome da tecnologia (ex: `Leitor de Tela`).      | -                                   |

### **Tabela `Aluno_Tecnologia_Assistiva`**
| Campo                    | Tipo      | Restrições                           | Descrição                                             | Relacionamentos                             |
|--------------------------|----------|--------------------------------------|-------------------------------------------------------|---------------------------------------------|
| `id`                     | `INT`    | `PK, AUTO_INCREMENT`                 | Identificador único da relação.                       | -                                           |
| `aluno_id`               | `INT`    | `NOT NULL`            | ID do aluno da API externa.                                 |   -                            |
| `tecnologia_assistiva_id`| `INT`    | `FK (Tecnologia_Assistiva.id), NOT NULL` | Referência à tecnologia assistiva.              | Tecnologia_Assistiva (`N:1`)              |

### **Tabela `Atendimento`**
| Campo             | Tipo          | Restrições                     | Descrição                                | Relacionamentos           |
|-------------------|---------------|--------------------------------|------------------------------------------|---------------------------|
| `id`              | `INT`         | `PK, AUTO_INCREMENT`           | Identificador único do atendimento.      | -                         |
| `aluno_id`        | `INT`         | `NOT NULL`      | ID do aluno da API externa.                        |             |
| `data_atendimento`| `DATETIME`    | `NOT NULL`                     | Data/hora do atendimento.               | -                         |
| `tipo_atendimento`| `VARCHAR(255)`| `NOT NULL`                     | Tipo do atendimento (ex: pedagógico).   | -                         |
| `profissional_id` | `INT`         | `FK (Profissional.id), NOT NULL`| Profissional responsável.               | Profissional (`N:1`)      |

### **Legenda**:
- **PK**: Chave primária.
- **FK**: Chave estrangeira.
- **N:1**: Relacionamento muitos-para-um.
- **1:N**: Relacionamento um-para-muitos.

### **Observação**:
A tabela `Aluno` foi removida do banco de dados atual pois as informações dos alunos agora são obtidas através de uma API externa produzida pela sala. Como todos os dados necessários dos alunos são acessados diretamente dessa API, a tabela local estava sendo inutilizada, resultando em duplicação desnecessária de informações. Por isso, as tabelas `Atendimento` e `Aluno_Tecnologia_Assistiva` agora armazenam apenas o ID do aluno para referência na API externa. Porém a utilização da tabela `Aluno` para o armazenamento de outras informações adicionais ainda está sendo discutida no grupo.

## Passo a Passo para Criar o Banco de Dados

1. **Instale um banco de dados compatível** (MySQL, PostgreSQL, etc.).
2. **Abra um terminal ou um cliente SQL**.
3. **Crie um novo banco de dados** com o comando:
   ```sql
   CREATE DATABASE linkup;
   ```
4. **Acesse o banco de dados**:
   ```sql
   USE linkup;
   ```
5. **Execute o script `create_database.sql`** para criar as tabelas:
   ```sql
   SOURCE caminho/para/create_database.sql;
   ```
6. **Execute o script `initial_data.sql`** para inserir dados iniciais:
   ```sql
   SOURCE caminho/para/initial_data.sql;
   ```
7. **Verifique se os dados foram inseridos corretamente**:
   ```sql
   SELECT * FROM Usuario;
   ```

## Script `create_database.sql`

Este script cria todas as tabelas, define chaves primárias, estrangeiras e restrições. Abaixo, a explicação detalhada de cada tabela:

### **Tabela `Usuario`**
| Campo   | Tipo         | Descrição                          | Restrições               |
|-------- |------------- |------------------------------------|--------------------------|
| `id`    | INT          | Identificador único do usuário     | AUTO_INCREMENT, PK       |
| `nome`  | VARCHAR(255) | Nome do usuário                    | NOT NULL                 |
| `email` | VARCHAR(255) | Email do usuário                   | NOT NULL, UNIQUE         |
| `senha` | VARCHAR(255) | Senha criptografada                | NOT NULL                 |
| `cargo` | VARCHAR(255) | Cargo (ex: admin, professor)       | NOT NULL                 |

### **Tabela `Profissional`**
| Campo          | Tipo         | Descrição                          | Restrições               |
|----------------|--------------|------------------------------------|--------------------------|
| `id`           | INT          | Identificador único                | AUTO_INCREMENT, PK       |
| `nome`         | VARCHAR(255) | Nome do profissional               | NOT NULL                 |
| `email`        | VARCHAR(255) | Email do profissional              | NOT NULL, UNIQUE         |
| `ocupacao`     | VARCHAR(255) | Ocupação do profissional           | NOT NULL                 |
| `ativo`        | BOOLEAN      | Status de atividade                | NOT NULL                 |
| `dataCadastro` | DATETIME     | Data de cadastro do profissional   | NOT NULL                 |

### **Tabela `Tecnologia_Assistiva`**
| Campo   | Tipo         | Descrição                          | Restrições               |
|-------- |------------- |------------------------------------|--------------------------|
| `id`    | INT          | Identificador único               | AUTO_INCREMENT, PK       |
| `nome`  | VARCHAR(255) | Nome da tecnologia (ex: leitor)   | NOT NULL, UNIQUE         |

### **Tabela `Aluno_Tecnologia_Assistiva`**
| Campo                    | Tipo         | Descrição                          | Restrições               |
|--------------------------|--------------|------------------------------------|--------------------------|
| `id`                     | INT          | Identificador único da relação    | AUTO_INCREMENT, PK       |
| `aluno_id`               | INT          | ID do aluno da API externa.               | NOT NULL  |
| `tecnologia_assistiva_id`| INT          | Referência à tecnologia assistiva | FK (Tecnologia_Assistiva.id), NOT NULL |

### **Tabela `Atendimento`**
| Campo                 | Tipo         | Descrição                          | Restrições               |
|-----------------------|--------------|------------------------------------|--------------------------|
| `id`                  | INT          | Identificador único               | AUTO_INCREMENT, PK       |
| `aluno_id`            | INT          | ID do aluno da API externa.                    | NOT NULL  |
| `data_atendimento`    | DATETIME     | Data/hora do atendimento          | NOT NULL                 |
| `tipo_atendimento`    | VARCHAR(255) | Tipo (ex: psicológico, pedagógico)| NOT NULL                 |
| `profissional_id`     | INT          | Profissional responsável          | FK (Profissional.id), NOT NULL |

## Relacionamentos
- **API Externa (Alunos) → Atendimento**: Um aluno (identificado pelo ID externo) pode ter vários atendimentos.
- **Profissional → Atendimento**: Um profissional pode realizar vários atendimentos (1).
- **API Externa (Alunos) → Aluno_Tecnologia_Assistiva → Tecnologia_Assistiva**: Relacionamento muitos-para-muitos entre Alunos (da API externa) e Tecnologia Assistiva.


<div align="center">
  <sub>Figura 2 - Modelo Lógico do Banco de Dados</sub><br>
  <img src="../../documentos/img/modelo-logico.png" width="60%"><br>
  <sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

## Script `initial_data.sql`

Este script insere dados iniciais nas tabelas do banco, permitindo testes imediatos e garantindo que o sistema funcione corretamente desde o primeiro uso. Os dados foram projetados para respeitar as restrições de chaves primárias e estrangeiras.

### **Dados Inseridos**

#### **Tabela `Usuario`**
- **Campos**: `nome`, `email`, `senha`, `cargo`.
- **Dados**:  
  5 usuários com cargos de `Gerente Administrativo` e `Gerente de Unidade`.
- **Exemplo**:  
  ```sql
  ('Ana Souza', 'ana.souza@email.com', 'senha123', 'Gerente Administrativo');
  ```

#### **Tabela `Profissional`**
- **Campos**: `nome`, `email`, `ocupacao`.
- **Dados**:  
  5 profissionais cadastrados com ocupação.
- **Exemplo**:  
  ```sql
  ('Dr. João Martins', 'joao.martins@email.com', 'Psicólogo');
  ```

#### **Tabela `Tecnologia_Assistiva`**
- **Campos**: `nome`.
- **Dados**:  
  8 tecnologias assistivas cadastradas.
- **Exemplo**:  
  ```sql
  ('Software de Comando por Voz');
  ```

#### **Tabela `Aluno_Tecnologia_Assistiva`**
- **Campos**: `aluno_id`, `tecnologia_assistiva_id`.
- **Exemplo**:  
  ```sql
  (2749, 1); -- Aluno com ID 2749 usa Leitor de Tela
  ```

#### **Tabela `Atendimento`**
- **Campos**: `aluno_id`, `data_atendimento`, `tipo_atendimento`, `profissional_id`, `tecnologia_assistiva_id`.
- **Dados**:  
  14 atendimentos realizados, com referências válidas às tabelas relacionadas.
- **Observações**: 
  - `tecnologia_assistiva_id` pode ser `NULL` (ex: atendimento médico sem tecnologia).
  - Datas no formato `YYYY-MM-DD HH:MM:SS`.
- **Exemplo**:  
  ```sql
  (2749, '2024-02-01 10:00:00', 'Consulta Psicológica', 1);
  ```

## Dependências

Para executar o banco de dados e rodar os scripts fornecidos, é necessário ter as seguintes dependências instaladas:

- **MySQL** (ou MariaDB compatível)
  - Recomendado: MySQL 8.x ou superior
- Cliente SQL (ex: MySQL Workbench, DBeaver, VSCode SQL extension ou terminal)
- Permissão para executar scripts SQL (`SOURCE`)

### 📦 Como instalar o MySQL
- [Download oficial MySQL](https://dev.mysql.com/downloads/)
