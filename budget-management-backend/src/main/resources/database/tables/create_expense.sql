CREATE TABLE IF NOT EXISTS `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(250) DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `date` timestamp DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(25) DEFAULT NULL,
  `payment_method` varchar(25) DEFAULT NULL,
  `schedule` varchar(25) DEFAULT NULL,
  `variable` BOOLEAN DEFAULT FALSE,
  `hide` BOOLEAN DEFAULT FALSE,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_expense_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;