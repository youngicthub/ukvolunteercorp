-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 15, 2023 at 04:07 PM
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
-- Database: `covimeds_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `fullName` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `_id`, `email`, `fullName`, `password`, `createdAt`) VALUES
(6, 'ddf415ce30da05976d5a8b2803214174', 'chinonso.d.gabriel@gmail.com', 'Mike Stones', '$2a$10$Nxyb7Owakh09GFUJjzhXAuw93ECBvgEEmYZPJUGnrSFAzZa0.aWMO', '2023-12-15T14:59:55.642Z');

-- --------------------------------------------------------

--
-- Table structure for table `billing_address`
--

CREATE TABLE `billing_address` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `fullName` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `phoneNumber` text DEFAULT NULL,
  `country` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `postalCode` text DEFAULT NULL,
  `owner_id` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing_address`
--

INSERT INTO `billing_address` (`id`, `_id`, `fullName`, `email`, `phoneNumber`, `country`, `state`, `postalCode`, `owner_id`, `createdAt`) VALUES
(1, '9abe1db974233d8f404d957a6484cf65', 'Gabriel Delight', 'chinonso.d.gabriel@gmail.com', '08078945122', 'United Kingdom', 'London', '22474', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-08T08:32:15.801Z'),
(3, 'd7c9c385ff81ac5f465ad5d714d91580', 'Gabriel Delight', 'chinonso.d.gabriel@gmail.com', '08078945122', 'United Kingdom', 'London', '22474', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-08T13:00:00.703Z'),
(4, '995c87b55a2597f2bdaaed38059843b1', 'Gabriel Delight', 'chinonso.d.gabriel@gmail.com', '08078945122', 'United Kingdom', 'London', '22474', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-08T13:09:03.293Z'),
(5, 'ec5c585dd1875bf9506acd03bcba5189', 'Chinonso Gabriel', 'gabrieldelight08@gmail.com', '08080054577', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-14T10:30:06.641Z'),
(6, '2dd766111b494acbef65095c9865cc1f', 'Chinonso Gabriel', 'gabrieldelight08@gmail.com', '08080054577', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-14T10:42:21.055Z'),
(7, '7f0948020e41c92b31d4037bc62e7adb', 'Chinonso Gabriel', 'gabrieldelight08@gmail.com', '08080054577', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-14T10:51:35.343Z'),
(8, 'e7c6e4f1d9c58dd438fb153012d1e899', 'Chinonso Gabriel', 'gabrieldelight08@gmail.com', 'sds', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-15T12:54:48.887Z'),
(9, 'd008ea1030ba3ac081fb8cb30dd104e2', 'Chinonso Gabriel', 'chinonso.d.gabriel@gmail.com', 'fgfgfgf', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-15T13:39:17.885Z'),
(10, 'c4ca7265eb8aa3ed3cdd1e668b154378', 'Chinonso Gabriel', 'gabrieldelight08@gmail.com', 'sdsds', 'Nigeria', 'RIVERS', '500001', '94b4afda91fa3a91e66e5ba17be7af15', '2023-12-15T13:44:55.251Z');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `_id`, `name`, `createdAt`) VALUES
(5, '76a2cdd208b0e27b1b16ff25d8295f5a', 'animal', '2023-12-08T13:16:14.455Z'),
(9, '3667596d11f1ca4b61d7d318a7c50edd', 'fgf', '2023-12-13T09:44:37.346Z'),
(10, 'ae4855537f3ab5024d3f942be09f7540', 'dsdsdsdsd', '2023-12-13T14:23:31.585Z'),
(11, '7ae70c8a856a3673d692c6c4d44bd25c', 'sdsdsd', '2023-12-13T14:23:39.467Z');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `order_id` text DEFAULT NULL,
  `owner_id` text DEFAULT NULL,
  `brand_id` text DEFAULT NULL,
  `category_id` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `qty` text DEFAULT NULL,
  `price` text DEFAULT NULL,
  `receipt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `_id`, `order_id`, `owner_id`, `brand_id`, `category_id`, `name`, `description`, `status`, `createdAt`, `image`, `qty`, `price`, `receipt`) VALUES
(12, '7a6e225d', 'be4b7501', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '9afce0fb3e90174db2a81e62459c2f3e', 'Azee', 'Black seed oil is an herbal ingredient derived from the plant Nigella sativa, which is native to Eastern Europe and Western Asia. Known for its powerful medicinal properties, black seed oil is a natural remedy that people use to treat a wide range of conditions', 'pending', '2023-12-15T13:02:03.808Z', 'product-1702635935883.jpg', '2', '30', NULL),
(13, '4ddd8515', 'be4b7501', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:02:03.809Z', 'product-1702626219584.jpg', '7', '150', NULL),
(14, 'c15ed5cb', 'be4b7501', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:02:03.809Z', 'product-1702626219584.jpg', '7', '150', NULL),
(15, '0fb8defb', 'be4b7501', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', 'pending', '2023-12-15T13:02:03.809Z', 'product-1702459992821.jpeg', '1', '900', NULL),
(16, '0945090c', 'be4b7501', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', 'pending', '2023-12-15T13:02:03.810Z', 'product-1702293217638.jpeg', '1', '23232', NULL),
(17, 'ea2648ce', '21ebc246', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '9afce0fb3e90174db2a81e62459c2f3e', 'Azee', 'Black seed oil is an herbal ingredient derived from the plant Nigella sativa, which is native to Eastern Europe and Western Asia. Known for its powerful medicinal properties, black seed oil is a natural remedy that people use to treat a wide range of conditions', 'pending', '2023-12-15T13:25:11.770Z', 'product-1702635935883.jpg', '2', '30', 'receipt-1702646711729.jpeg'),
(18, '818690f9', '21ebc246', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:25:11.772Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702646711729.jpeg'),
(19, 'c0b1594a', '21ebc246', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:25:11.772Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702646711729.jpeg'),
(20, 'b963b3d4', '21ebc246', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', 'pending', '2023-12-15T13:25:11.772Z', 'product-1702459992821.jpeg', '1', '900', 'receipt-1702646711729.jpeg'),
(21, '467d6df8', '21ebc246', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', 'pending', '2023-12-15T13:25:11.772Z', 'product-1702293217638.jpeg', '1', '23232', 'receipt-1702646711729.jpeg'),
(22, 'cc1c6b32', 'ad73d45e', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '9afce0fb3e90174db2a81e62459c2f3e', 'Azee', 'Black seed oil is an herbal ingredient derived from the plant Nigella sativa, which is native to Eastern Europe and Western Asia. Known for its powerful medicinal properties, black seed oil is a natural remedy that people use to treat a wide range of conditions', 'pending', '2023-12-15T13:32:28.134Z', 'product-1702635935883.jpg', '2', '30', 'receipt-1702647148120.jpeg'),
(23, '889a243d', 'ad73d45e', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:32:28.135Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647148120.jpeg'),
(24, '11116e49', 'ad73d45e', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:32:28.135Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647148120.jpeg'),
(25, 'bd6500a4', 'ad73d45e', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', 'pending', '2023-12-15T13:32:28.136Z', 'product-1702459992821.jpeg', '1', '900', 'receipt-1702647148120.jpeg'),
(26, 'bfb733c5', 'ad73d45e', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', 'pending', '2023-12-15T13:32:28.136Z', 'product-1702293217638.jpeg', '1', '23232', 'receipt-1702647148120.jpeg'),
(27, '6fea9961', '29a328c4', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '9afce0fb3e90174db2a81e62459c2f3e', 'Azee', 'Black seed oil is an herbal ingredient derived from the plant Nigella sativa, which is native to Eastern Europe and Western Asia. Known for its powerful medicinal properties, black seed oil is a natural remedy that people use to treat a wide range of conditions', 'pending', '2023-12-15T13:39:30.437Z', 'product-1702635935883.jpg', '2', '30', 'receipt-1702647570432.jpeg'),
(28, '7ce6a9e7', '29a328c4', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:39:30.438Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647570432.jpeg'),
(29, '923c39cb', '29a328c4', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:39:30.438Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647570432.jpeg'),
(30, '719d2ed3', '29a328c4', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', 'pending', '2023-12-15T13:39:30.438Z', 'product-1702459992821.jpeg', '1', '900', 'receipt-1702647570432.jpeg'),
(31, 'a501660c', '29a328c4', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', 'pending', '2023-12-15T13:39:30.441Z', 'product-1702293217638.jpeg', '1', '23232', 'receipt-1702647570432.jpeg'),
(32, '8ddbc502', '36819b7b', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '9afce0fb3e90174db2a81e62459c2f3e', 'Azee', 'Black seed oil is an herbal ingredient derived from the plant Nigella sativa, which is native to Eastern Europe and Western Asia. Known for its powerful medicinal properties, black seed oil is a natural remedy that people use to treat a wide range of conditions', 'pending', '2023-12-15T13:45:01.504Z', 'product-1702635935883.jpg', '2', '30', 'receipt-1702647901497.jpeg'),
(33, 'e2bb70ea', '36819b7b', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:45:01.505Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647901497.jpeg'),
(34, '77c58952', '36819b7b', '94b4afda91fa3a91e66e5ba17be7af15', NULL, 'df5ea9d1c8c778ca86912605afd7862f', 'Fluvoxamine', 'These medicines are thought to work by increasing the activity of a chemical called serotonin in the brain', 'pending', '2023-12-15T13:45:01.505Z', 'product-1702626219584.jpg', '7', '150', 'receipt-1702647901497.jpeg'),
(35, 'efe649a7', '36819b7b', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', 'pending', '2023-12-15T13:45:01.505Z', 'product-1702459992821.jpeg', '1', '900', 'receipt-1702647901497.jpeg'),
(36, '63874f9e', '36819b7b', '94b4afda91fa3a91e66e5ba17be7af15', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', 'pending', '2023-12-15T13:45:01.505Z', 'product-1702293217638.jpeg', '1', '23232', 'receipt-1702647901497.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `brand_id` text DEFAULT NULL,
  `category_id` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `_id`, `brand_id`, `category_id`, `name`, `description`, `price`, `status`, `image`, `createdAt`) VALUES
(11, '2255646713cbf537f5c5f465105860e6', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'dewarmer ', 'dsd', '232', 'active', 'product-1702292829289.jpeg', '2023-12-11T11:07:09.292Z'),
(12, '7eb385942cfa5f2c2924f4bebec4dbeb', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'This code creates a simple HTML table with three columns (ID, Name, and Email) and a couple of sample rows. You can customize it further by adding more rows or modifying the table structure based on your specific requirements.\r\n\r\n\r\n', '100', 'active', 'product-1702292955776.jpeg', '2023-12-11T11:09:15.779Z'),
(14, 'ac52f9e2c0270135f081bb59838ea1bc', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'Shoe', 'sdsd', '23232', 'active', 'product-1702293217638.jpeg', '2023-12-11T11:13:37.660Z'),
(15, '0747a4b5aa22fd54362869613484ceec', NULL, '76a2cdd208b0e27b1b16ff25d8295f5a', 'sds', 'sds', '900', 'active', 'product-1702459992821.jpeg', '2023-12-13T09:33:12.827Z');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `_id` text DEFAULT NULL,
  `fullName` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `_id`, `fullName`, `email`, `password`, `createdAt`) VALUES
(3, '94b4afda91fa3a91e66e5ba17be7af15', 'John Doe', 'chinonso.d.gabriel@gmail.com', '$2a$10$.vuc5SE4Ap41TwMZNWOeAuTg5gbF7fIifTehsVQ5bQSvR4RMHcQDG', '2023-12-07T16:37:35.329Z'),
(6, '354c62724dd61a4094cf1ac92b40ab31', 'deli', 'gabrieldelight08@gmail.com', '$2a$10$bkML981bRaa0DHjucCmWuu7.Q5Z7MCitTK.goMDKVX9Rdx4WMq4mS', '2023-12-15T14:40:47.517Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billing_address`
--
ALTER TABLE `billing_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `billing_address`
--
ALTER TABLE `billing_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
