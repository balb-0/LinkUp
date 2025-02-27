INSERT INTO Usuario (nome, email, senha, cargo) VALUES
('Ana Souza', 'ana.souza@email.com', 'senha123', 'Gerente Administrativo'),
('Carlos Lima', 'carlos.lima@email.com', 'senha456', 'Gerente Administrativo'),
('Mariana Alves', 'mariana.alves@email.com', 'senha789', 'Gerente de Unidade'),
('Ricardo Mendes', 'ricardo.mendes@email.com', 'senha321', 'Gerente de Unidade'),
('Fernanda Rocha', 'fernanda.rocha@email.com', 'senha654', 'Gerente de Unidade');

INSERT INTO Profissional (nome, email) VALUES
('Dr. João Martins', 'joao.martins@email.com'),
('Dra. Paula Silva', 'paula.silva@email.com'),
('Dr. Lucas Santos', 'lucas.santos@email.com'),
('Dra. Beatriz Costa', 'beatriz.costa@email.com'),
('Dr. Eduardo Freitas', 'eduardo.freitas@email.com');

INSERT INTO Aluno (nome, unidade, curso, turno, necessidade_especial) VALUES
('Lucas Pereira', 'Unidade Central', 'Engenharia', 'Matutino', 'Nenhuma'),
('Juliana Ribeiro', 'Unidade Leste', 'Ciência da Computação', 'Noturno', 'Deficiência visual'),
('Bruno Fernandes', 'Unidade Norte', 'Administração', 'Vespertino', 'Nenhuma'),
('Tatiane Oliveira', 'Unidade Sul', 'Medicina', 'Integral', 'Deficiência auditiva'),
('André Mendes', 'Unidade Oeste', 'Arquitetura', 'Matutino', 'Nenhuma');

INSERT INTO Tecnologia_Assistiva (nome) VALUES
('Leitor de Tela'),
('Teclado Adaptado'),
('Aparelho Auditivo'),
('Software de Comando por Voz'),
('Lupa Eletrônica');

INSERT INTO Atendimento (aluno_id, data_atendimento, tipo_atendimento, profissional_id, tecnologia_assistiva_id) VALUES
(1, '2024-02-01 10:00:00', 'Consulta Psicológica', 1, 2),
(2, '2024-02-05 14:30:00', 'Atendimento Pedagógico', 2, 1),
(3, '2024-02-10 09:15:00', 'Consulta Médica', 3, NULL),
(4, '2024-02-15 16:00:00', 'Avaliação Física', 4, 3),
(5, '2024-02-20 11:45:00', 'Treinamento de Inclusão', 5, 4);