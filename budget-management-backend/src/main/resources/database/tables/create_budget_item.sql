CREATE TABLE IF NOT EXISTS budget_item (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category VARCHAR(25),
    label VARCHAR(255),
    target_amount FLOAT,
    schedule VARCHAR(25),
    auto_add BOOLEAN,
    payment_method VARCHAR(25),
    date DATE,
    spent INT,
    user_id int(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_budget_item_user FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;