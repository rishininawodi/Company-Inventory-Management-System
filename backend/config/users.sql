-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2026 at 03:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company_inventorydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'user',
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `profile_image`, `created_at`) VALUES
(1, 'Rishini', 'nawodirishini88@gmail.com', '$2y$10$bKPMYOrbl7qs5tSxwETt/O4nBezacUE0R7Bcyeenm0fQ7ScPpjN8C', 'user', 'profile_1_1775650335.jpeg', '2026-04-08 07:10:24'),
(2, 'Rishini nawodi', 'nawodirishini@gmail.com', '$2y$10$pPc8SBYwfQPDSGM0OnUfneNiIUADUZbc1UxGnG9xd.8wTf95rLuvK', 'user', NULL, '2026-04-08 07:13:36'),
(8, 'Test User', 'testuser@gmail.com', '$2y$10$SPGCePGB86MthvHEjpZDH.yetuNrw14GqMuJBwBm3n9KRw4t2Q4iq', 'user', NULL, '2026-04-08 07:51:22'),
(9, 'Rishini', 'nawodirishin@gmail.com', '$2y$10$O2nCCKxKYY3RPv39d.7D1u5/YsFDx/Y1j.qmeBE7cJNxgeEnPkqru', 'user', NULL, '2026-04-08 07:57:51'),
(16, 'Rishini', 'nawodirishini98@gmail.com', '$2y$10$s0Ho4HiCpjMg4eyYGRiL8eJ14ewl9K6bViJXaM/gvbHEHfRIt1yye', 'user', NULL, '2026-04-08 08:07:31'),
(17, 'Rishini', 'nawodirishini9@gmail.com', '$2y$10$UWzXCXfL86oWd46YePXI9.eusXh9DKArjhCpJoZBc5Ljicwx2X4xS', 'user', NULL, '2026-04-08 08:07:54'),
(18, 'Rishin', 'nawodirishini999@gmail.com', '$2y$10$haC.OasxF4cbUS2Gs553wOjJB1gQFtkFrGk/TKKq7omhaviL/OJza', 'user', NULL, '2026-04-08 08:08:08'),
(19, '', 'nawodirishini0@gmail.com', '$2y$10$Uo2hIcVbHgVo0n9PTShO7eb.DPW9APl/dQXrkP30rfWzy0al4bsaG', 'user', NULL, '2026-04-08 08:48:29'),
(20, 'sithmi', 'sithmiirishini88@gmail.com', '$2y$10$4JvA3fM53gjjvkdRYOw88uqq0hys/oI8DvvpgiFS6mbtdqY6WPVvi', 'user', NULL, '2026-04-08 13:40:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
