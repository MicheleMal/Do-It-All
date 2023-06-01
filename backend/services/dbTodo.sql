CREATE TABLE IF NOT EXISTS todo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed ENUM("true", "false")
);

