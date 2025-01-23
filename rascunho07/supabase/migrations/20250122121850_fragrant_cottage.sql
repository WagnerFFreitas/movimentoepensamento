/*
  # Initial database schema for Movimento e Pensamento

  1. Tables
    - users (patients)
    - appointments
    - evaluations
    - treatments

  2. Security
    - Passwords are hashed
    - Role-based access control
*/

CREATE DATABASE IF NOT EXISTS movimento_pensamento;
USE movimento_pensamento;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(200),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state CHAR(2),
    zip_code VARCHAR(10),
    cpf VARCHAR(14) UNIQUE,
    role ENUM('patient', 'admin') DEFAULT 'patient',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    appointment_type ENUM('evaluation', 'treatment') NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_appointment (appointment_date, appointment_time)
);

-- Evaluations table
CREATE TABLE IF NOT EXISTS evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    appointment_id INT NOT NULL,
    evaluation_date DATE NOT NULL,
    symptoms TEXT,
    diagnosis TEXT,
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Treatments table
CREATE TABLE IF NOT EXISTS treatments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    appointment_id INT NOT NULL,
    treatment_date DATE NOT NULL,
    procedures TEXT,
    observations TEXT,
    next_appointment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Indexes for better performance
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_user ON appointments(user_id);
CREATE INDEX idx_evaluations_user ON evaluations(user_id);
CREATE INDEX idx_treatments_user ON treatments(user_id);