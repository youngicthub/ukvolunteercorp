-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2024 at 08:39 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `donation_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `fullName` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `_id`, `fullName`, `email`, `password`, `createdAt`) VALUES
(1, '7f140e624141464bc74039211b60b921', 'Gabriel Delight', 'gabrieldelight08@gmail.com', '$2a$10$MkXh5e4jQOJlupIL5YrbSOE0vJPvBM9Mx7xOslOPVKmcImi/vMhLG', '2024-01-11T07:07:28.230Z');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `firstname` text DEFAULT NULL,
  `lastname` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `amount` text DEFAULT NULL,
  `receipt` text DEFAULT NULL,
  `phone_number` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `payment_method` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `_id`, `firstname`, `lastname`, `email`, `amount`, `receipt`, `phone_number`, `message`, `createdAt`, `payment_method`) VALUES
(7, 'a904897f957ffe10d7b4f0b053a1aef0', 'Gabriel', 'Delight', 'gabrieldelight08@gmail.com', '100', 'donations-1704958763954.png', '08087455614', 'Hello I would love to do some donations here love yall', '2024-01-11T07:39:23.955Z', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
