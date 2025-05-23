CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE usuarios(
    id integer PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    funcao VARCHAR(255) NOT NULL,
    criado TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO usuarios(usuario, senha, funcao)
VALUES ('primeiraconta', 'gabriel', 'admin');


CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  imageUrl VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
