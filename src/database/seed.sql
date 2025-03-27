-- Inserção de Usuários
INSERT INTO Usuario (nome, email, senha, cargo) VALUES
('Ana Souza', 'ana.souza@email.com', 'senha123', 'Gerente Administrativo'),
('Carlos Lima', 'carlos.lima@email.com', 'senha456', 'Gerente Administrativo'),
('Mariana Alves', 'mariana.alves@email.com', 'senha789', 'Gerente de Unidade'),
('Ricardo Mendes', 'ricardo.mendes@email.com', 'senha321', 'Gerente de Unidade'),
('Fernanda Rocha', 'fernanda.rocha@email.com', 'senha654', 'Gerente de Unidade');

-- Inserção de Profissionais (ocupação obrigatória)
INSERT INTO Profissional (nome, email, ocupacao) VALUES
('Dr. João Martins', 'joao.martins@email.com', 'Psicólogo'),
('Dra. Paula Silva', 'paula.silva@email.com', 'Pedagoga'),
('Dr. Lucas Santos', 'lucas.santos@email.com', 'Médico'),
('Dra. Beatriz Costa', 'beatriz.costa@email.com', 'Fisioterapeuta'),
('Dr. Eduardo Freitas', 'eduardo.freitas@email.com', 'Instrutor de Inclusão');

-- Inserção de Tecnologias Assistivas
INSERT INTO Tecnologia_Assistiva (nome) VALUES
('Leitor de Tela'),
('Teclado Adaptado'),
('Aparelho Auditivo'),
('Software de Comando por Voz'),
('Lupa Eletrônica'),
('Cadeira de Rodas Motorizada'),
('Prancha de Comunicação'),
('Software de Leitura de Texto');

-- Inserção de Aluno_Tecnologia_Assistiva (usando ids de alunos da API externa)
-- Observação: Substitua os IDs pelos IDs reais da sua API externa
INSERT INTO Aluno_Tecnologia_Assistiva (id_aluno, tecnologia_assistiva_id) VALUES
(2, 1), -- Aluno com ID 2 usa Leitor de Tela
(4, 3), -- Aluno com ID 4 usa Aparelho Auditivo
(7, 5), -- Aluno com ID 7 usa Lupa Eletrônica
(9, 1); -- Aluno com ID 9 usa Leitor de Tela

-- Inserção de Atendimentos
-- Observação: Substitua os IDs pelos IDs reais de alunos da sua API externa
INSERT INTO Atendimento (id_aluno, data_atendimento, tipo_atendimento, profissional_id) VALUES
(1, '2024-02-01 10:00:00', 'Consulta Psicológica', 1),
(2, '2024-02-05 14:30:00', 'Atendimento Pedagógico', 2),
(3, '2024-02-10 09:15:00', 'Consulta Médica', 3),
(4, '2024-02-15 16:00:00', 'Avaliação Física', 4),
(5, '2024-02-20 11:45:00', 'Treinamento de Inclusão', 5),
(6, '2024-03-01 09:00:00', 'Sessão Psicopedagógica', 1),
(7, '2024-03-02 10:30:00', 'Consulta Terapêutica', 2),
(8, '2024-03-03 11:00:00', 'Avaliação Psicológica', 3),
(9, '2024-03-04 15:00:00', 'Atendimento Médico', 3),
(10, '2024-03-05 13:30:00', 'Acompanhamento Escolar', 2),
(7, '2024-03-06 14:00:00', 'Sessão Terapia Ocupacional', 4),
(8, '2024-03-07 09:45:00', 'Atendimento Psicológico', 1),
(9, '2024-03-08 08:30:00', 'Treinamento Inclusivo', 5),
(10, '2024-03-09 10:15:00', 'Consulta Médica', 3);

