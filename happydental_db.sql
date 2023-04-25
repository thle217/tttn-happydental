-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2023 at 06:59 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'nha khoa tổng quát', 1, '2023-04-25', '2023-04-25'),
(2, 'trồng răng implant', 1, '2023-04-25', '2023-04-25'),
(3, 'bọc răng sứ', 1, '2023-04-25', '2023-04-25'),
(4, 'tẩy trắng răng', 1, '2023-04-25', '2023-04-25'),
(5, 'niềng răng', 1, '2023-04-25', '2023-04-25'),
(6, 'nhổ răng khôn', 1, '2023-04-25', '2023-04-25');

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
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_roleId_of_users` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `role_id`, `fullname`, `avatar`, `dob`, `gender`, `phone`, `degree`, `start_date`, `street`, `ward`, `district`, `city`, `email`, `password`, `is_verified`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Thi Hau Le', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402080/bgx1zgg5dftavhhduypy.jpg', '2001-07-21', 0, '0767039678', NULL, NULL, NULL, NULL, NULL, NULL, 'admin001@gmail.com', '$2b$10$sFxzAMzjhs2NUKHsSXx78OfYQRLIEUWuw4tBZd6FBAOdklsIqYzVO', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxLCJpYXQiOjE2ODI0MDQ5NzIsImV4cCI6MTcxMzk0MDk3Mn0.dQEjl0MU9pQx3BPr0RAav0Mb5AW2yKt4IfGKV7YNhg8', '2023-04-24', '2023-04-25'),
(2, 3, 'Lễ Tân 01', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402092/s0bteixxrophusnarjby.jpg', '2000-02-22', 0, '0901231234', NULL, NULL, NULL, NULL, NULL, NULL, 'letan01@gmail.com', '$2b$10$/T88uM4S0PGiMNt7xw04bemH0ZJELPq6Odu.9Gig/kD3lSHgWmv.O', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoyLCJpYXQiOjE2ODIzMjM0MzQsImV4cCI6MTcxMzg1OTQzNH0.LMcpG8JXsCczwCHnwLjlCIHrPSYIlrDQN1QHresbNWc', '2023-04-24', '2023-04-25'),
(3, 4, 'Bác sĩ 01', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402114/f1dqnmyvhghtf282c82h.jpg', '1989-04-25', 0, '0901234987', 'Tiến sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi01@gmail.com', '$2b$10$QaufAIDOcZL96PTfAL4cYugHgRfPhGVYRfS1M6i3CbgrwU8N1yH.2', 0, NULL, '2023-04-25', '2023-04-25'),
(4, 4, 'Bác sĩ 02', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402166/z1tw8r2pf0dsvj5ibavo.jpg', '1988-07-02', 1, '0901234567', 'Tiến sĩ', NULL, NULL, NULL, 'Quận 10', 'Thành phố Hồ Chí Minh', 'bacsi02@gmail.com', '$2b$10$w8ZFZoOZwKZkHGtb3tEPVOS5..bHs65DcjYEKAVTerWsbuuTPjsGK', 0, NULL, '2023-04-25', '2023-04-25'),
(5, 4, 'Bác sĩ 03', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402212/qmhq9swjdycsrze2bqmq.jpg', '1995-02-10', 0, '0901234561', 'Thạc sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi03@gmail.com', '$2b$10$RP47SB64R1WV89TpbRzdSe238N/mL7iMz6czqrw2C/BFOkLCf3eZ6', 0, NULL, '2023-04-25', '2023-04-25'),
(6, 4, 'Bác sĩ 04', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402263/mfmi9zy2b7505tzwqmfy.jpg', '1977-10-10', 1, '0901231234', 'Tiến sĩ', NULL, NULL, NULL, NULL, NULL, 'bacsi04@gmail.com', '$2b$10$Cwunaoy61EV5eALbtqkgFe/kBGwg.hjiYF9jxvbtEHdEtfchPCxNO', 0, NULL, '2023-04-25', '2023-04-25'),
(7, 5, 'Phụ tá 01', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682402311/rmixlq96qtr88edtqsex.png', '2000-01-16', 1, '0908761234', 'Cử nhân', NULL, NULL, NULL, NULL, NULL, 'phuta01@gmail.com', '$2b$10$Z0xATJb0LByOwtif5J9j9Ol1SIXJN8sNWBZRv9nzV5ulTcSeBDEeC', 0, NULL, '2023-04-25', '2023-04-25'),
(8, 1, 'Nguyễn Văn A', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682403677/yu4lcri0jcfm1oalvavr.jpg', '2001-10-10', 1, '0901231236', NULL, NULL, NULL, NULL, NULL, 'Thành phố Hồ Chí Minh', 'banhcamatcha@gmail.com', '$2b$10$aJWW4bkQ6ajDJefXNr71fu5T4bobEAuPGGuIC6TPxWqmSJR8dvJm6', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoxLCJ1c2VyX2lkIjo4LCJpYXQiOjE2ODI0MDM3MDYsImV4cCI6MTcxMzkzOTcwNn0.AQjm2lZBkTRi_YfgiW_-YdehD4jXW8txRtqa_Coi6as', '2023-04-25', '2023-04-25'),
(9, 1, 'Trần Thị B', 'https://res.cloudinary.com/dcteqnz2i/image/upload/v1682404724/pfalqmzvya0d01kzwd9n.jpg', '1999-07-10', 0, '0901231238', NULL, NULL, NULL, NULL, 'Quận Ba Đình', 'Thành phố Hà Nội', 'khachhang001@gmail.com', '$2b$10$vJihWyCR..NpJmFAmJ0Z4elcjFjsS4pDxKp85Z97DXkrZRdSEwoXO', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoxLCJ1c2VyX2lkIjo5LCJpYXQiOjE2ODI0MDQ5MjcsImV4cCI6MTcxMzk0MDkyN30.SbmM689SXVd-UbjC3lLlqXw7X1B4o63xXzkWAVu9SNs', '2023-04-25', '2023-04-25');

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
