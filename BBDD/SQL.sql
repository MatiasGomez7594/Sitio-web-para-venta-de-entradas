-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mis_entradas;
USE mis_entradas;

-- Tabla usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    genero VARCHAR(20),
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(12),
    contrasena VARCHAR(100) NOT NULL,
    estado ENUM('activo', 'inactivo') NOT NULL
);

-- Tabla permisos
CREATE TABLE permisos (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Tabla roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(70) -- usuario, admin eventos, admin sistemas, etc.
);

-- Relación entre roles y permisos
CREATE TABLE roles_permisos (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (id_permiso) REFERENCES permisos(id) ON DELETE CASCADE
);

-- Relación entre roles y usuarios
CREATE TABLE roles_usuarios (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_rol INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla provincias
CREATE TABLE provincias (
    id_provincia INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla ciudades
CREATE TABLE ciudades (
    id_ciudad INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(200),
    id_provincia INT NOT NULL,
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia) ON DELETE CASCADE
);

-- Tabla categorías de eventos
CREATE TABLE categorias_eventos (
    id_categoria INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_categoria VARCHAR(50),
    estado ENUM('activo', 'inactivo') NOT NULL -- Borrado lógico
);

-- Tabla eventos
CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_categoria_evento INT NOT NULL,
    nombre_evento VARCHAR(255) NOT NULL,
    nombre_recinto VARCHAR(255) NOT NULL,
    evento_mayores TINYINT NOT NULL DEFAULT 0,
    evento_discapacitados TINYINT NOT NULL DEFAULT 0,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    id_provincia INT NOT NULL,
    id_ciudad INT NOT NULL,
    direccion VARCHAR(255),
    total_localidades INT NOT NULL,
    id_admin_evento INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'activo' NOT NULL,
    FOREIGN KEY (id_admin_evento) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria_evento) REFERENCES categorias_eventos(id_categoria) ON DELETE CASCADE,
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia) ON DELETE CASCADE,
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad) ON DELETE CASCADE
);

-- Tabla imágenes de eventos
CREATE TABLE imgs_eventos (
    id_img INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_evento INT NOT NULL,
    nombre_img VARCHAR(255),
    url_img VARCHAR(255),
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);

-- Tipos de entradas
CREATE TABLE tipos_entradas (
    id_tipo INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_tipo VARCHAR(100),
    estado ENUM('activo', 'inactivo') NOT NULL
);

-- Entradas por evento
CREATE TABLE tipos_entradas_evento (
    id_tipo_x_evento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_tipo_entrada INT NOT NULL,
    id_evento INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_por_tipo INT NOT NULL,
    estan_numeradas ENUM('si', 'no') NOT NULL,
    estado VARCHAR(50) DEFAULT 'activo' NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas(id_tipo) ON DELETE CASCADE
);

-- Tabla entradas numeradas
CREATE TABLE entradas_numeradas (
    id_entrada INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    numeracion_entrada INT NOT NULL,
    id_tipo_entrada INT NOT NULL,
    estado ENUM('disponible', 'vendida') NOT NULL,
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_x_evento) ON DELETE CASCADE
);

-- Tabla compras
CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_comprador VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    metodo_pago ENUM('Credito/Debito', 'Efectivo') NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla compra_items
CREATE TABLE compra_items (
    id_compra INT NOT NULL,
    id_tipo_entrada INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_x_evento) ON DELETE CASCADE
);

-- Tabla preguntas frecuentes
CREATE TABLE preguntas_frecuentes (
    id_pregunta INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    pregunta TEXT NOT NULL,
    contenido TEXT NOT NULL,
    estado ENUM('activa', 'inactiva') NOT NULL
);

-- Tabla consultas usuarios
CREATE TABLE consultas_usuarios (
    id_consulta INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    contenido_consulta TEXT NOT NULL,
    nombre_usuario VARCHAR(250),
    email_usuario VARCHAR(150),
    fecha_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activa', 'respondida') NOT NULL
);

-- Tabla calificación de eventos
CREATE TABLE calificacion_evento (
    id_calificacion INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_evento INT NOT NULL,
    id_usuario INT NOT NULL,
    calificacion INT NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla tarjetas
CREATE TABLE tarjetas (
    id_tarjeta INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_titular VARCHAR(100) NOT NULL,
    apellido_titular VARCHAR(100) NOT NULL,
    numero_tarjeta VARCHAR(16) NOT NULL,
    fecha_emision VARCHAR(5) NOT NULL,
    fecha_expiracion VARCHAR(5) NOT NULL,
    codigo_seguridad VARCHAR(100) NOT NULL,
    tipo_tarjeta ENUM('Crédito', 'Débito') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Aquí puedes añadir los INSERT con datos si los necesitas
