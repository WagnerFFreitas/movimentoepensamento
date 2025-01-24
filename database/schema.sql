-- Criar banco de dados
CREATE DATABASE clinica;
USE clinica;

-- Tabelas principais
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'medico', 'paciente') NOT NULL
);

CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT
);

CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT,
    medico_id INT,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status ENUM('pendente', 'confirmado', 'cancelado') DEFAULT 'pendente',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES usuarios(id)
);

CREATE TABLE prontuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT,
    medico_id INT,
    data_consulta DATETIME,
    diagnostico TEXT,
    prescricao TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES usuarios(id)
);

-- Procedures
DELIMITER //

CREATE PROCEDURE sp_criar_agendamento(
    IN p_paciente_id INT,
    IN p_medico_id INT,
    IN p_data DATE,
    IN p_hora TIME
)
BEGIN
    INSERT INTO agendamentos (paciente_id, medico_id, data, hora, status)
    VALUES (p_paciente_id, p_medico_id, p_data, p_hora, 'pendente');
END //

-- Triggers
CREATE TRIGGER trg_log_agendamento
AFTER INSERT ON agendamentos
FOR EACH ROW
BEGIN
    INSERT INTO logs (acao, tabela, registro_id, data_hora)
    VALUES ('NOVO_AGENDAMENTO', 'agendamentos', NEW.id, NOW());
END //

DELIMITER ;

-- Índices
CREATE INDEX idx_pacientes_nome ON pacientes(nome);
CREATE INDEX idx_agendamentos_data ON agendamentos(data);
CREATE INDEX idx_prontuarios_paciente ON prontuarios(paciente_id);

-- Configuração do backup automático
DELIMITER //

CREATE EVENT evento_backup_diario
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    -- Procedures de backup
    CALL sp_backup_sistema();
END //

CREATE PROCEDURE sp_backup_sistema()
BEGIN
    -- Configurações de backup
    SET @data = DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s');
    SET @caminho = 'D:/movimentoepensamento/backups/';
    SET @arquivo = CONCAT(@caminho, 'backup_', @data, '.sql');
    
    -- Comando de backup
    SET @comando = CONCAT(
        'mysqldump -u root -p clinica > ',
        @arquivo
    );
    
    -- Executa backup
    SET @resultado = sys_exec(@comando);
END //

DELIMITER ;


-- Inserir dados iniciais para teste
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Admin', 'admin@clinica.com', 'admin123', 'admin'),
('Dr. João', 'joao@clinica.com', 'medico123', 'medico'),
('Maria', 'maria@email.com', 'paciente123', 'paciente');

INSERT INTO pacientes (nome, cpf, email, telefone, data_nascimento) VALUES
('José Silva', '123.456.789-00', 'jose@email.com', '(11) 99999-9999', '1980-01-01'),
('Ana Santos', '987.654.321-00', 'ana@email.com', '(11) 88888-8888', '1990-05-15');

INSERT INTO agendamentos (paciente_id, medico_id, data, hora, status) VALUES
(1, 2, CURDATE(), '10:00', 'pendente'),
(2, 2, CURDATE(), '14:30', 'confirmado');


