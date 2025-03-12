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
- [Script `01_create_database.sql`](#-script-01_create_databasesql)
  - [Tabela `Usuario`](#tabela-usuario)
  - [Tabela `Profissional`](#tabela-profissional)
  - [Tabela `Aluno`](#tabela-aluno)
  - [Tabela `Tecnologia_Assistiva`](#tabela-tecnologia_assistiva)
  - [Tabela `Atendimento`](#tabela-atendimento)
- [Relacionamentos](#-relacionamentos)
- [Script `02_initial_data.sql`](#-script-02_initial_datasql)
  - [Dados Inseridos](#-dados-inseridos)

## Visão Geral do Banco de Dados
O banco de dados do projeto LinkUp foi modelado para gerenciar informações de alunos, profissionais, atendimentos e tecnologias assistivas. Abaixo está a estrutura física implementada no script `01_create_database.sql`.

<div align="center">
  <sub>Figura 1 - Modelo Conceitual do Banco de Dados</sub><br>
  <img src="../../documentos/img/modelo-conceitual.jpg" width="80%"><br>
  <sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

## Dicionário de Dados
O dicionário de dados descreve a estrutura, tipos, restrições e relacionamentos das tabelas do banco. 

### **Tabela `Usuario`**
| Campo        | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|--------------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`         | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do usuário.          | -               |
| `nome`       | `VARCHAR(255)`| `NOT NULL`               | Nome completo do usuário.                | -               |
| `email`      | `VARCHAR(255)`| `NOT NULL, UNIQUE`       | Email institucional (único por usuário). | -               |
| `senha`      | `VARCHAR(255)`| `NOT NULL`               | Senha criptografada (hash).              | -               |
| `cargo`      | `VARCHAR(255)`| `NOT NULL`               | Cargo (ex: `Gerente Administrativo`).    | -               |

### **Tabela `Profissional`**
| Campo        | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|--------------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`         | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do profissional.    | Atendimento (`1:N`) |
| `nome`       | `VARCHAR(255)`| `NOT NULL`               | Nome do profissional.                   | -               |
| `email`      | `VARCHAR(255)`| `NOT NULL, UNIQUE`       | Email institucional (único).            | -               |

### **Tabela `Aluno`**
| Campo                  | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|------------------------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`                   | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do aluno.           | Atendimento (`1:N`) |
| `nome`                 | `VARCHAR(255)`| `NOT NULL`               | Nome completo do aluno.                 | -               |
| `unidade`              | `VARCHAR(255)`| `NOT NULL`               | Unidade acadêmica (ex: `Unidade Leste`).| -               |
| `curso`                | `VARCHAR(255)`| `NOT NULL`               | Curso matriculado.                      | -               |
| `turno`                | `VARCHAR(255)`| `NOT NULL`               | Turno (ex: `Noturno`).                  | -               |
| `necessidade_especial` | `VARCHAR(255)`| -                        | Necessidades especiais (opcional).      | -               |

### **Tabela `Tecnologia_Assistiva`**
| Campo        | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|--------------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`         | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único da tecnologia.      | Atendimento (`1:N`) |
| `nome`       | `VARCHAR(255)`| `NOT NULL`               | Nome da tecnologia (ex: `Leitor de Tela`). | -            |

### **Tabela `Atendimento`**
| Campo                      | Tipo          | Restrições               | Descrição                                | Relacionamentos |
|----------------------------|---------------|--------------------------|------------------------------------------|-----------------|
| `id`                       | `INT`         | `PK, AUTO_INCREMENT`     | Identificador único do atendimento.     | -               |
| `aluno_id`                 | `INT`         | `FK (Aluno.id), NOT NULL`| Aluno atendido.                         | Aluno (`N:1`)   |
| `data_atendimento`         | `DATETIME`    | `NOT NULL`               | Data/hora do atendimento.               | -               |
| `tipo_atendimento`         | `VARCHAR(255)`| `NOT NULL`               | Tipo (ex: `Atendimento Pedagógico`).    | -               |
| `profissional_id`          | `INT`         | `FK (Profissional.id), NOT NULL` | Profissional responsável.      | Profissional (`N:1`) |
| `tecnologia_assistiva_id`  | `INT`         | `FK (Tecnologia_Assistiva.id)` | Tecnologia usada (opcional). | Tecnologia_Assistiva (`N:1`) |

### **Legenda**:
- **PK**: Chave primária.
- **FK**: Chave estrangeira.
- **N:1**: Relacionamento muitos-para-um.
- **1:N**: Relacionamento um-para-muitos.

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
5. **Execute o script `01_create_database.sql`** para criar as tabelas:
   ```sql
   SOURCE caminho/para/01_create_database.sql;
   ```
6. **Execute o script `02_initial_data.sql`** para inserir dados iniciais:
   ```sql
   SOURCE caminho/para/02_initial_data.sql;
   ```
7. **Verifique se os dados foram inseridos corretamente**:
   ```sql
   SELECT * FROM Usuario;
   ```

## Script `01_create_database.sql`
Este script cria todas as tabelas, define chaves primárias, estrangeiras e restrições. Abaixo, a explicação detalhada de cada tabela:

### **Tabela `Usuario`**
Armazena os usuários do sistema, incluindo seus cargos e credenciais.
| Campo   | Tipo         | Descrição                          | Restrições               |
|---------|--------------|------------------------------------|--------------------------|
| `id`    | INT          | Identificador único do usuário     | `AUTO_INCREMENT, PK`     |
| `nome`  | VARCHAR(255) | Nome do usuário                    | `NOT NULL`               |
| `email` | VARCHAR(255) | Email do usuário                   | `NOT NULL, UNIQUE`       |
| `senha` | VARCHAR(255) | Senha criptografada                | `NOT NULL`               |
| `cargo` | VARCHAR(255) | Cargo (ex: admin, professor)       | `NOT NULL`               |

### **Tabela `Profissional`**
Registra profissionais responsáveis por atendimentos.
| Campo     | Tipo         | Descrição                          | Restrições               |
|-----------|--------------|------------------------------------|--------------------------|
| `id`      | INT          | Identificador único               | `AUTO_INCREMENT, PK`     |
| `nome`    | VARCHAR(255) | Nome do profissional               | `NOT NULL`               |
| `email`   | VARCHAR(255) | Email do profissional              | `NOT NULL, UNIQUE`       |

### **Tabela `Aluno`**
Contém informações dos alunos atendidos.
| Campo                  | Tipo         | Descrição                          | Restrições               |
|------------------------|--------------|------------------------------------|--------------------------|
| `id`                   | INT          | Identificador único               | `AUTO_INCREMENT, PK`     |
| `nome`                 | VARCHAR(255) | Nome do aluno                      | `NOT NULL`               |
| `unidade`              | VARCHAR(255) | Unidade acadêmica                 | `NOT NULL`               |
| `curso`                | VARCHAR(255) | Curso do aluno                     | `NOT NULL`               |
| `turno`                | VARCHAR(255) | Turno (matutino, vespertino)      | `NOT NULL`               |
| `necessidade_especial` | VARCHAR(255) | Necessidades especiais do aluno   | (opcional)              |

### **Tabela `Tecnologia_Assistiva`**
Lista tecnologias assistivas disponíveis.
| Campo   | Tipo         | Descrição                          | Restrições               |
|---------|--------------|------------------------------------|--------------------------|
| `id`    | INT          | Identificador único               | `AUTO_INCREMENT, PK`     |
| `nome`  | VARCHAR(255) | Nome da tecnologia (ex: leitor)   | `NOT NULL`               |

### **Tabela `Atendimento`**
Registra os atendimentos realizados entre alunos e profissionais.
| Campo                        | Tipo         | Descrição                          | Restrições               |
|------------------------------|--------------|------------------------------------|--------------------------|
| `id`                         | INT          | Identificador único               | `AUTO_INCREMENT, PK`     |
| `aluno_id`                   | INT          | Aluno atendido                    | `NOT NULL, FK (Aluno)`   |
| `data_atendimento`           | DATETIME     | Data/hora do atendimento          | `NOT NULL`               |
| `tipo_atendimento`           | VARCHAR(255) | Tipo (ex: psicológico, pedagógico)| `NOT NULL`               |
| `profissional_id`            | INT          | Profissional responsável          | `NOT NULL, FK (Profissional)` |
| `tecnologia_assistiva_id`    | INT          | Tecnologia usada (opcional)       | `FK (Tecnologia_Assistiva)` |

## Relacionamentos
- **Aluno → Atendimento**: Um aluno pode ter vários atendimentos (`1:N`).
- **Profissional → Atendimento**: Um profissional pode realizar vários atendimentos (`1:N`).
- **Atendimento → Tecnologia_Assistiva**: Um atendimento pode usar uma tecnologia assistiva (`N:1`).

<div align="center">
  <sub>Figura 2 - Modelo Lógico do Banco de Dados</sub><br>
  <img src="../../documentos/img/modelo-logico.png" width="60%"><br>
  <sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

## Script `02_initial_data.sql`
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
- **Campos**: `nome`, `email`.
- **Dados**:  
  5 profissionais com nomes e emails únicos.
- **Exemplo**:  
  ```sql
  ('Dr. João Martins', 'joao.martins@email.com');
  ```

#### **Tabela `Aluno`**
- **Campos**: `nome`, `unidade`, `curso`, `turno`, `necessidade_especial`.
- **Dados**:  
  5 alunos com informações acadêmicas e necessidades especiais (opcional).
- **Exemplo**:  
  ```sql
  ('Juliana Ribeiro', 'Unidade Leste', 'Ciência da Computação', 'Noturno', 'Deficiência visual');
  ```

  #### **Tabela `Tecnologia_Assistiva`**
- **Campos**: `nome`.
- **Dados**:  
  5 tecnologias assistivas (ex: `Leitor de Tela`, `Aparelho Auditivo`)
- **Exemplo**:  
  ```sql
  ('Software de Comando por Voz');
  ```

#### **Tabela `Atendimento`**
- **Campos**: `aluno_id`, `data_atendimento`, `tipo_atendimento`, `profissional_id`, `tecnologia_assistiva_id`.
- **Dados**:  
  5 atendimentos com datas, tipos e referências válidas às tabelas relacionadas.
- **Observações**: 
  - `tecnologia_assistiva_id` pode ser `NULL` (ex: atendimento médico sem tecnologia).
  - Datas no formato `YYYY-MM-DD HH:MM:SS`.
- **Exemplo**:  
  ```sql
  (2, '2024-02-05 14:30:00', 'Atendimento Pedagógico', 2, 1);
  ```
  