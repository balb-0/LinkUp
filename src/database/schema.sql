-- Criação da tabela de usuários do Centro Paula Souza
CREATE TABLE IF NOT EXISTS Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  nome VARCHAR(255) NOT NULL,                     -- Nome do usuário
  email VARCHAR(255) NOT NULL UNIQUE,             -- Email do usuário
  senha VARCHAR(255) NOT NULL,                    -- Senha do usuário
  cargo ENUM('Gerente Administrativo', 'Gerente de Unidade', 'Acessor', 'Outro') NOT NULL                     -- Cargo ou função do usuário no sistema
);

-- Criação da tabela de profissionais
CREATE TABLE IF NOT EXISTS Profissional (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  nome VARCHAR(255) NOT NULL,                     -- Nome do profissional
  email VARCHAR(255) NOT NULL UNIQUE,             -- Email do profissional
  ocupacao VARCHAR(255) NOT NULL,                 -- Ocupação
  ativo BOOLEAN NOT NULL DEFAULT TRUE,            -- Status de atividade
  dataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Data e hora de cadastro do profissional
);

-- Criação da tabela de alunos atendidos
CREATE TABLE IF NOT EXISTS Aluno (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  nome VARCHAR(255) NOT NULL,                     -- Nome do aluno
  unidade VARCHAR(255) NOT NULL,                  -- Unidade onde o aluno estuda
  curso VARCHAR(255) NOT NULL,                    -- Curso do aluno
  turno ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral') NOT NULL, -- Turno de estudo
  necessidade_especial VARCHAR(255)               -- Necessidade especial (se existir)
);

-- Tabela que armazena as tecnologias assistivas
CREATE TABLE IF NOT EXISTS Tecnologia_Assistiva (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  nome VARCHAR(255) UNIQUE NOT NULL               -- Nome da tecnologia assistiva
);

-- Tabela de relacionamento entre Aluno e Tecnologia Assistiva
CREATE TABLE IF NOT EXISTS Aluno_Tecnologia_Assistiva (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  aluno_id INT NOT NULL,                          -- Chave estrangeira do aluno
  tecnologia_assistiva_id INT NOT NULL,           -- Chave estrangeira da tecnologia assistiva

  FOREIGN KEY (aluno_id) REFERENCES Aluno(id) ON DELETE CASCADE,                           -- Se o aluno for deletado, apaga a relação
  FOREIGN KEY (tecnologia_assistiva_id) REFERENCES Tecnologia_Assistiva(id) ON DELETE CASCADE, -- Se a tecnologia for deletada, apaga a relação
  UNIQUE(aluno_id, tecnologia_assistiva_id)        -- Garante que não cadastre a mesma tecnologia pro aluno mais de uma vez
);

-- Tabela de atendimentos realizados
CREATE TABLE IF NOT EXISTS Atendimento (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Identificador único e chave primária
  aluno_id INT NOT NULL,                          -- Chave estrangeira do aluno atendido
  data_atendimento DATETIME NOT NULL,             -- Data e hora do atendimento
  tipo_atendimento VARCHAR(255) NOT NULL,         -- Tipo do atendimento realizado
  profissional_id INT NOT NULL,                   -- Chave estrangeira do profissional responsável

  FOREIGN KEY (aluno_id) REFERENCES Aluno(id) ON DELETE CASCADE,                        -- Se o aluno for deletado, apaga o atendimento
  FOREIGN KEY (profissional_id) REFERENCES Profissional(id) ON DELETE CASCADE           -- Se o profissional for deletado, apaga o atendimento
);
