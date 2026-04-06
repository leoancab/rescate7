CREATE DATABASE IF NOT EXISTS rescate7;
USE rescate7;

CREATE TABLE divisiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_division VARCHAR(100) NOT NULL
);

CREATE TABLE uniones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_division INT NOT NULL,
    nom_union VARCHAR(100) NOT NULL,

    FOREIGN KEY (id_division) REFERENCES divisiones(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE misiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_union INT NOT NULL,
    nom_mision VARCHAR(100) NOT NULL,

    FOREIGN KEY (id_union) REFERENCES uniones(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE distritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mision INT NOT NULL,
    nom_distrito VARCHAR(100) NOT NULL,

    FOREIGN KEY (id_mision) REFERENCES misiones(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE iglesias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_distrito INT NOT NULL,
    nom_iglesia VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),

    FOREIGN KEY (id_distrito) REFERENCES distritos(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_iglesia INT NOT NULL,
    nom_grupo VARCHAR(100) NOT NULL,

    FOREIGN KEY (id_iglesia) REFERENCES iglesias(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE tipo_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nro_celular VARCHAR(20),
    nom_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    fec_nacim DATE,
    id_tipo_usuario INT NOT NULL,
    id_iglesia INT NULL,
    id_grupo INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

    FOREIGN KEY (id_iglesia) REFERENCES iglesias(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

    FOREIGN KEY (id_grupo) REFERENCES grupos(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE visitas_misioneras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_visitador INT NOT NULL,
    id_visitado INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    estado ENUM('pendiente', 'realizada', 'cancelada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_visitador) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (id_visitado) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX idx_uniones_division ON uniones(id_division);
CREATE INDEX idx_misiones_union ON misiones(id_union);
CREATE INDEX idx_distritos_mision ON distritos(id_mision);
CREATE INDEX idx_iglesias_distrito ON iglesias(id_distrito);
CREATE INDEX idx_grupos_iglesia ON grupos(id_iglesia);
CREATE INDEX idx_usuarios_iglesia ON usuarios(id_iglesia);
CREATE INDEX idx_usuarios_grupo ON usuarios(id_grupo);

INSERT INTO tipo_usuario (tipo, descripcion) VALUES
('admin', 'Administrador del sistema'),
('liderIglesia','Líder de Iglesia'),
('liderGrupo', 'Líder de grupo'),
('miembro', 'Miembro regular'),
('prospecto', 'Persona aún no es miembro');