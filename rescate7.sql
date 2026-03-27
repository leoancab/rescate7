CREATE DATABASE IF NOT EXISTS rescate7;
USE rescate7;

CREATE TABLE divisiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_division VARCHAR(100) NOT NULL
);

CREATE TABLE uniones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_division INT,
    nom_union VARCHAR(100),
    FOREIGN KEY (id_division) REFERENCES divisiones(id)
);

CREATE TABLE misiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_union INT,
    nom_mision VARCHAR(100),
    FOREIGN KEY (id_union) REFERENCES uniones(id)
);

CREATE TABLE distritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mision INT,
    nom_distrito VARCHAR(100),
    FOREIGN KEY (id_mision) REFERENCES misiones(id)
);

CREATE TABLE iglesias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_distrito INT,
    id_administrador INT,
    nom_iglesia VARCHAR(100),
    direccion VARCHAR(255),
    FOREIGN KEY (id_distrito) REFERENCES distritos(id)
);

CREATE TABLE grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_iglesia INT,
    nom_grupo VARCHAR(100),
    id_admin INT,
    FOREIGN KEY (id_iglesia) REFERENCES iglesias(id)
);

CREATE TABLE tipo_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    descripcion VARCHAR(255)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nro_celular VARCHAR(20),
    nom_usuario VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    fec_nacim DATE,
    id_tipo_usuario INT,
    id_iglesia INT,
    id_grupo INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id),
    FOREIGN KEY (id_iglesia) REFERENCES iglesias(id),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id)
);

CREATE TABLE visitas_misioneras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_visitador INT,
    id_visitado INT,
    fecha_hora DATETIME,
    estado ENUM('pendiente', 'realizada', 'cancelada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_visitador) REFERENCES usuarios(id),
    FOREIGN KEY (id_visitado) REFERENCES usuarios(id)
);

INSERT INTO tipo_usuario (tipo, descripcion) VALUES
('admin', 'Administrador del sistema'),
('liderIglesia','Líder de Iglesia'),
('liderGrupo', 'Líder de grupo'),
('miembro', 'Miembro regular'),
('prospecto', 'Persona aún no es miembro');