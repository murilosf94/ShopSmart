CREATE DATABASE pyke;
USE pyke;

CREATE TABLE usuarios(
    id integer PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    funcao VARCHAR(255) NOT NULL,
    criado TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO usuarios(usuario, senha, funcao)
VALUES ('primeiraconta', 'gabriel', 'admin');

