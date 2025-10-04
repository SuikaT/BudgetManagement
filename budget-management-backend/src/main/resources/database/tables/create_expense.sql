CREATE TABLE IF NOT EXISTS expense (
  id BIGINT NOT NULL AUTO_INCREMENT,
  label varchar(255) DEFAULT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date timestamp DEFAULT CURRENT_TIMESTAMP,
  category varchar(25) DEFAULT NULL,
  payment_method varchar(25) DEFAULT NULL,
  hide BOOLEAN DEFAULT FALSE,
  budget_item_id BIGINT DEFAULT NULL,
  user_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_expense_budget_item FOREIGN KEY (budget_item_id) REFERENCES budget_item(id) ON DELETE CASCADE,
  CONSTRAINT fk_expense_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;