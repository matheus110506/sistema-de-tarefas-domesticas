-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/03/2026 às 14:51
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `homework_system`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `filhos`
--

CREATE TABLE `filhos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `mae_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `filhos`
--

INSERT INTO `filhos` (`id`, `nome`, `email`, `senha`, `mae_id`) VALUES
(1, 'Matheus Almeida de Lima', 'matheus110506@hotmail.com', '$2b$10$UaIRzrLbnKI667clM/3V.O4XvUAHs4mgNht7XNeEacUcC5FMjGy1C', 1),
(2, 'Geronimo', 'ge@gmail.com', '$2b$10$UYYJiION2tHHd6PwNM8PC.bg2wYkE0H9c2htMzHWGWeLw1jQsomz.', 1),
(3, 'Joao', 'joao@gmail.com', '$2b$10$LJNhuPjmdmYJQko5BRwF3.p/xlraBRbWajvJMxayPqO53yypBv0Pm', 1),
(4, 'Jac', 'jac@gmail.com', '$2b$10$ypx34tE7F8DdIw6amdxIGuiy5zlEOsK3mEriSWfNb50QlhY5Iez6i', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ips_banidos`
--

CREATE TABLE `ips_banidos` (
  `id` int(11) NOT NULL,
  `ip` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `acao` varchar(255) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `maes`
--

CREATE TABLE `maes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `maes`
--

INSERT INTO `maes` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'Simone Aparecida de Almeida Lima', 'si@gmail.com', '$2b$10$6WkwDvcH.ArYUxmLE.3b4.wJaz0OQKuEkRVj2H1ogOk8cZUQ6btGS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `mae_id` int(11) NOT NULL,
  `filho_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `titulo`, `descricao`, `mae_id`, `filho_id`) VALUES
(7, 'Varrer a calçada', 'Use a vassoura verde', 1, 1),
(8, 'sei la', 'deixa quieto', 1, 1),
(9, 'aa', 'sas', 1, 2),
(10, 'sasa', 'asaas', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas_concluidas`
--

CREATE TABLE `tarefas_concluidas` (
  `filho_id` int(11) NOT NULL,
  `tarefa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas_concluidas`
--

INSERT INTO `tarefas_concluidas` (`filho_id`, `tarefa_id`) VALUES
(1, 7),
(1, 8),
(2, 9);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `filhos`
--
ALTER TABLE `filhos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_filho_mae` (`mae_id`);

--
-- Índices de tabela `ips_banidos`
--
ALTER TABLE `ips_banidos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `maes`
--
ALTER TABLE `maes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tarefa_mae` (`mae_id`),
  ADD KEY `fk_filho` (`filho_id`);

--
-- Índices de tabela `tarefas_concluidas`
--
ALTER TABLE `tarefas_concluidas`
  ADD PRIMARY KEY (`filho_id`,`tarefa_id`),
  ADD KEY `fk_tarefac_tarefa` (`tarefa_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `filhos`
--
ALTER TABLE `filhos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `ips_banidos`
--
ALTER TABLE `ips_banidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `maes`
--
ALTER TABLE `maes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `filhos`
--
ALTER TABLE `filhos`
  ADD CONSTRAINT `fk_filho_mae` FOREIGN KEY (`mae_id`) REFERENCES `maes` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `fk_filho` FOREIGN KEY (`filho_id`) REFERENCES `filhos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tarefa_filho` FOREIGN KEY (`filho_id`) REFERENCES `filhos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tarefa_mae` FOREIGN KEY (`mae_id`) REFERENCES `maes` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tarefas_concluidas`
--
ALTER TABLE `tarefas_concluidas`
  ADD CONSTRAINT `fk_tarefac_filho` FOREIGN KEY (`filho_id`) REFERENCES `filhos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tarefac_tarefa` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
