-- budget_management.`user` definition

CREATE TABLE IF NOT EXISTS `user` (
  id int(11) NOT NULL AUTO_INCREMENT,
  firstname char(50) DEFAULT NULL,
  lastname char(50) DEFAULT NULL,
  email char(150) DEFAULT NULL,
  password varchar(32) DEFAULT NULL,
  last_connection timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;