CREATE TABLE todo (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      completed BOOLEAN DEFAULT FALSE
);
