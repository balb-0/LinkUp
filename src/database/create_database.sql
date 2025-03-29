-- Criação da tabela de usuários do Centro Paula Souza
CREATE TABLE IF NOT EXISTS Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Identificador único e chave primária
  nome VARCHAR(255) NOT NULL,
  -- Nome do usuário
  email VARCHAR(255) NOT NULL UNIQUE,
  -- Email do usuário
  senha VARCHAR(255) NOT NULL,
  -- Senha do usuário
  cargo ENUM(
    'Gerente Administrativo',
    'Gerente de Unidade',
    'Acessor',
    'Outro'
  ) NOT NULL -- Cargo ou função do usuário no sistema
);
-- Criação da tabela de profissionais
CREATE TABLE IF NOT EXISTS Profissional (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Identificador único e chave primária
  nome VARCHAR(255) NOT NULL,
  -- Nome do profissional
  email VARCHAR(255) NOT NULL UNIQUE,
  -- Email do profissional
  ocupacao VARCHAR(255) NOT NULL,
  -- Ocupação
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  -- Status de atividade
  dataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Data e hora de cadastro do profissional
);
-- Tabela que armazena as tecnologias assistivas
CREATE TABLE IF NOT EXISTS Tecnologia_Assistiva (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Identificador único e chave primária
  nome VARCHAR(255) UNIQUE NOT NULL -- Nome da tecnologia assistiva
);
-- Tabela de atendimentos realizados (modificada para usar id_aluno externo)
CREATE TABLE IF NOT EXISTS Atendimento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Identificador único e chave primária
  aluno_id INT NOT NULL,
  -- ID do aluno da API externa
  data_atendimento DATETIME NOT NULL,
  -- Data e hora do atendimento
  tipo_atendimento VARCHAR(255) NOT NULL,
  -- Tipo do atendimento realizado
  profissional_id INT NOT NULL,
  -- Chave estrangeira do profissional responsável
  FOREIGN KEY (profissional_id) REFERENCES Profissional(id) ON DELETE CASCADE -- Se o profissional for deletado, apaga o atendimento
);
-- Tabela de relacionamento entre Aluno e Tecnologia Assistiva (modificada para usar id_aluno externo)
CREATE TABLE IF NOT EXISTS Aluno_Tecnologia_Assistiva (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Identificador único e chave primária
  aluno_id INT NOT NULL,
  -- ID do aluno da API externa
  tecnologia_assistiva_id INT NOT NULL,
  -- Chave estrangeira da tecnologia assistiva
  FOREIGN KEY (tecnologia_assistiva_id) REFERENCES Tecnologia_Assistiva(id) ON DELETE CASCADE,
  -- Se a tecnologia for deletada, apaga a relação
  UNIQUE(aluno_id, tecnologia_assistiva_id) -- Garante que não cadastre a mesma tecnologia pro aluno mais de uma vez
);