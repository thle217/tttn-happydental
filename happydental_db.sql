-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 19, 2023 at 05:28 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `happydental_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `appointment_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `is_for_another` tinyint(1) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `fk_customerId_of_appointments` (`customer_id`),
  KEY `fk_creatorId_of_appointments` (`creator_id`),
  KEY `fk_scheduleId_of_appointments` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `appointments_details`
--

DROP TABLE IF EXISTS `appointments_details`;
CREATE TABLE IF NOT EXISTS `appointments_details` (
  `appointment_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) NOT NULL,
  `doctor_category_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `file` mediumblob,
  `subtotal` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`appointment_detail_id`),
  KEY `fk_doctorCategoryId_of_details` (`doctor_category_id`),
  KEY `fk_appointmentId_of_details` (`appointment_id`),
  KEY `fk_serviceId_of_details` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE IF NOT EXISTS `bills` (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `method` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `fk_appointmentId_of_bills` (`appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'nha khoa tổng quát', 1, '2023-04-17', '2023-04-17'),
(3, 'niềng răng', 1, '2023-04-17', '2023-04-17'),
(4, 'nhổ răng khôn', 1, '2023-04-17', '2023-04-17'),
(5, 'trồng răng implant', 1, '2023-04-17', '2023-04-17'),
(9, 'bọc răng sứ', 1, '2023-04-17', '2023-04-18'),
(10, 'tẩy trắng răng', 1, '2023-04-17', '2023-04-18');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_categories`
--

DROP TABLE IF EXISTS `doctors_categories`;
CREATE TABLE IF NOT EXISTS `doctors_categories` (
  `doctor_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`doctor_category_id`),
  KEY `fk_categoryId_of_doctorsCategories` (`category_id`),
  KEY `fk_doctorId_of_doctorsCategories` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Khách hàng', NULL, NULL),
(2, 'Quản trị viên', NULL, NULL),
(3, 'Lễ tân', NULL, NULL),
(4, 'Bác sĩ', NULL, NULL),
(5, 'Phụ tá', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
CREATE TABLE IF NOT EXISTS `schedules` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `fk_employeeId_of_schedules` (`employee_id`),
  KEY `fk_sessionId_of_schedules` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-appointments_details.js'),
('create-appointments.js'),
('create-bills.js'),
('create-categories.js'),
('create-doctors_categories.js'),
('create-roles.js'),
('create-schedules.js'),
('create-services.js'),
('create-sessions.js'),
('create-users.js');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `fk_categoryId_of_services` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `dob` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `phone` char(10) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_roleId_of_users` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `role_id`, `fullname`, `avatar`, `dob`, `gender`, `phone`, `degree`, `start_date`, `street`, `ward`, `district`, `city`, `email`, `password`, `is_verified`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Thi Hau Le', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681214017/o4ml9etjmua1ruj3dqgp.jpg', '2001-07-21', 0, '0767039678', 'Sinh viên', '2019-09-16', NULL, NULL, NULL, NULL, 'admin001@gmail.com', '$2b$10$.OTnpmGKOwwmXpN5CnUmsuQL/TjDsrVbYEg.EwfMQAPFfalYF.AEm', 1, '2023-04-11', '2023-04-13'),
(2, 3, 'Lễ tân 01', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681805412/elndnkkspn3xiptccefi.jpg', '2000-04-11', 1, '0901234987', 'Cử nhân', NULL, NULL, NULL, 'Quận Tân Bình', 'Thành phố Hồ Chí Minh', 'letan01@gmail.com', '$2b$10$Yp5EbAIoiRvn7iYr/08jAuaV47eV38ce/z.uSVS3dLxATFOZeyem.', 1, '2023-04-11', '2023-04-18'),
(8, 1, 'Nguyễn Văn A', NULL, '2001-04-10', 1, '0901234987', NULL, NULL, NULL, NULL, 'Huyện Bảo Yên', 'Tỉnh Lào Cai', 'khachhang001@gmail.com', '$2b$10$fbZujjc917JipaEeRgXk3eZRm7rg.1nZYC4XbiFzdzoTFucaz2LBm', 1, '2023-04-16', '2023-04-18'),
(9, 4, 'Bác sĩ 01', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681650932/sj4gbriwslmfqqpgbh0t.jpg', '1999-12-12', 0, '0901234987', 'Thạc sĩ', '2023-04-16', NULL, NULL, NULL, 'Tỉnh Bắc Kạn', 'bacsi01@gmail.com', '$2b$10$.mDVXhPAImR9015dEv7JcepiX4wu84j2jrMEJkioAU0IkvVcCqv/i', 0, '2023-04-16', '2023-04-16'),
(10, 4, 'Bác sĩ 02', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681650973/xjsabpjxjvgozmgzvibf.jpg', '1989-04-05', 1, '0901234567', 'Tiến sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi02@gmail.com', '$2b$10$YCXXwqLg6Ok30REegzVsW.QE7Kdhn.8ymsjUcgPEupr44zRgiEv/S', 0, '2023-04-16', '2023-04-16'),
(11, 4, 'Bác sĩ 03', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681651013/hj3kkrcl9naomjezh0jp.jpg', '1996-04-11', 0, '0901234987', 'Thạc sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi03@gmail.com', '$2b$10$xoI7E/1UjTX20R5GJO/JdONIjfkWxJI.08uY1Cf7rdAafR2uUbY7O', 0, '2023-04-16', '2023-04-16'),
(12, 4, 'Bác sĩ 04', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1681651067/t3kfymrryfzacgrb7d7a.jpg', '1980-01-16', 1, '0701234987', 'Thạc sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi04@gmail.com', '$2b$10$vII7WKOi8TLr6J8ZczeT8.NvEswVXiSC./FAweoSQausW9PDKDzfS', 0, '2023-04-16', '2023-04-16');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_creatorId_of_appointments` FOREIGN KEY (`creator_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_customerId_of_appointments` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_scheduleId_of_appointments` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`schedule_id`);

--
-- Constraints for table `appointments_details`
--
ALTER TABLE `appointments_details`
  ADD CONSTRAINT `fk_appointmentId_of_details` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`),
  ADD CONSTRAINT `fk_doctorCategoryId_of_details` FOREIGN KEY (`doctor_category_id`) REFERENCES `doctors_categories` (`doctor_category_id`),
  ADD CONSTRAINT `fk_serviceId_of_details` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `fk_appointmentId_of_bills` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints for table `doctors_categories`
--
ALTER TABLE `doctors_categories`
  ADD CONSTRAINT `fk_categoryId_of_doctorsCategories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `fk_doctorId_of_doctorsCategories` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_employeeId_of_schedules` FOREIGN KEY (`employee_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_sessionId_of_schedules` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`);

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `fk_categoryId_of_services` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_roleId_of_users` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
