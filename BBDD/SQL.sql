--PARA CREAR LA BBDD
CREATE DATABASE mis_entradas;

CREATE TABLE usuarios(
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    genero VARCHAR(20),
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(12),
    contrasena VARCHAR(100) NOT NULL,
    estado ENUM('activo', 'inactivo') NOT NULL

)
<<<<<<< HEAD

=======
CREATE TABLE permisos (
  id int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(255) NOT NULL
) 

CREATE TABLE roles(
    id_rol INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(70) -- usuario, admin eventos, admin sistemas, etc
)

CREATE TABLE roles_permisos(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_rol int(11) NOT NULL,
  id_permiso int(11) NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (id_permiso) REFERENCES permisos(id)
)

CREATE TABLE roles_usuarios (
  id int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_rol int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) 


>>>>>>> 8ee65126797abff1ea8e011653169ef5a310e9f0

CREATE TABLE provincias(
    id_provincia INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(50)
)

CREATE TABLE ciudades(
    id_ciudad INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(200),
    id_provincia INT NOT NULL,
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia)

)


CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_categoria_evento INT NOT NULL, -- Clave foranea 
    nombre_evento VARCHAR(255) NOT NULL,  -- Nombre del evento
    nombre_recinto VARCHAR(255) NOT NULL,  -- Nombre del recinto donde se realiza el evento
    evento_mayores TINYINT NOT NULL DEFAULT 0,  -- 0 = No, 1 = Sí
    evento_discapacitados TINYINT NOT NULL DEFAULT 0,  -- 0 = No, 1 = Sí
    fecha_inicio DATETIME NOT NULL,  -- Fecha y hora de inicio del evento
    fecha_fin DATETIME NOT NULL,  -- Fecha y hora de finalización del evento
    id_provincia INT NOT NULL,  -- ID Provincia donde se realiza el evento
    id_ciudad INT NOT NULL,  -- ID Ciudad donde se realiza el evento
    direccion VARCHAR(255),  -- Dirección del evento
    total_localidades INT NOT NULL,  -- Total de localidades disponibles
    id_admin_evento INT NOT NULL,  -- Clave foránea que referencia a la tabla de administradores de eventos
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de registro del evento
    estado VARCHAR(50) DEFAULT 'activo' NOT NULL, 
    FOREIGN KEY (id_admin_evento) REFERENCES usuarios(id_usuario),  -- Relación con la tabla de administradores de eventos
    FOREIGN KEY (id_categoria_evento) REFERENCES categorias_eventos(id_categoria),  -- Relación con la tabla de categorias
    FOREIGN KEY (id_provincia) REFERENCES provincias(id_provincia),  -- Relación con la tabla de provincias
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad)  -- Relación con la tabla de ciudades

);
--DAtos de las imgs del evento
CREATE TABLE imgs_eventos(
    id_img INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_evento INT NOT NULL,
    nombre_img VARCHAR(255),
    url_img VARCHAR(255),
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)  -- Relación con la tabla de eventos

)

CREATE TABLE tipos_entradas(
    id_tipo INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_tipo VARCHAR(100),
    estado ENUM('activo', 'inactivo') NOT NULL -- Borrado logico

)


--entradas del evento
CREATE TABLE tipos_entradas_evento (
    id_tipo_x_evento INT PRIMARY  KEY NOT NULL AUTO_INCREMENT,
    id_tipo_entrada INT NOT NULL, -- clave primaria y foranea
    id_evento INT NOT NULL,  -- Clave foránea que referencia a la tabla de eventos
    precio DECIMAL(10, 2) NOT NULL,  -- Precio de la entrada
    cantidad_por_tipo INT NOT NULL,  -- Cantidad de entradas por tipo
    estan_numeradas VARCHAR(2),-- Estan numeradas si/no
    estado VARCHAR(50) DEFAULT 'activo' NOT NULL, 
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),  -- Relación con la tabla de eventos
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas(id_tipo)  -- Relación con la tabla con los tipos de entradas
);

CREATE TABLE entradas_numeradas(
    id_entrada INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    numeracion_entrada INT NOT NULL,
    id_tipo_entrada INT NOT NULL,
    estado ENUM('disponible', 'vendida') NOT NULL,
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_x_evento)  -- Relación con la tabla con los tipos de entradas

)


CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,  -- Clave foránea que referencia a la tabla de usuarios
    nombre_comprador VARCHAR(255) NOT NULL,  -- Nombre completo del comprador
    email VARCHAR(100) NOT NULL,  -- Email del comprador
    dni VARCHAR(20) NOT NULL,  -- DNI del comprador
    telefono VARCHAR(20) NOT NULL,  -- Teléfono del comprador
    metodo_pago ENUM('Credito/Debito', 'Efectivo') NOT NULL,  -- Método de pago
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de la compra
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE compra_items(
    id_compra INT NOT NULL,
    id_tipo_entrada INT NOT NULL,  -- Clave foránea que referencia a la tabla de tipos de entradas
    cantidad INT NOT NULL,  -- Cantidad de entradas compradas
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_entrada)
)



-- Crear tabla preguntas_frecuentes

CREATE TABLE preguntas_frecuentes (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    contenido TEXT NOT NULL,
    estado ENUM('activa', 'inactiva')
);

CREATE TABLE consultas_usuarios(
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    contenido_consulta TEXT NOT NULL,
    nombre_usuario VARCHAR(250),
    email_usuario VARCHAR(150),
    fecha_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de la consulta
    estado ENUM('activa', 'respondida') NOT NULL  -- Método de pago
)

CREATE TABLE calificacion_evento(
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    id_usuario INT NOT NULL
    calificacion INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),  -- Relación con la tabla de usuarios
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)  -- Relación con la tabla de eventos

)

CREATE TABLE tarjetas (

    id_tarjeta INT AUTO_INCREMENT PRIMARY KEY,

    id_usuario INT NOT NULL,

    nombre_titular VARCHAR(100) NOT NULL,

    apellido_titular VARCHAR(100) NOT NULL,

    numero_tarjeta VARCHAR(16) NOT NULL,  -- Número de tarjeta (16 dígitos)

    fecha_emision VARCHAR(5) NOT NULL,  -- Fecha de emisión (MM/AA)

    fecha_expiracion VARCHAR(5) NOT NULL,  -- Fecha de expiración (MM/AA)

    codigo_seguridad VARCHAR(100) NOT NULL,  -- Código de seguridad

    tipo_tarjeta ENUM('Crédito', 'Débito') NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)  -- Relación con la tabla de usuarios

);

CREATE TABLE categorias_eventos(
    id_categoria INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_categoria VARCHAR(50),
    estado ENUM('activo', 'inactivo') NOT NULL -- Borrado logico

)

--Algunos inserts
INSERT INTO `permisos`( `nombre`) VALUES ('Crear evento'),('Comprar entradas'),('Agregar administrador');
INSERT INTO `roles`( `nombre`) VALUES ('administrador de eventos'),('administrador de sistemas'),('cliente');
INSERT INTO `roles_permisos` ( `id_rol`, `id_permiso`) VALUES ( '1', '1'), ( '2', '3'), ( '3', '2');

INSERT INTO `categorias_eventos`( `nombre_categoria`) VALUES ('Musical'),
('Deportivo'),('Arte'),('Ciencia'),('Cine');

INSERT INTO `provincias` (`id_provincia`, `nombre`) VALUES (NULL, 'Buenos Aires'), 
(NULL, 'CABA'), (NULL, 'Santa Fé'), (NULL, 'Córdoba');

INSERT INTO `ciudades` (`id_ciudad`, `nombre`, `id_provincia`) VALUES (NULL, 'Merlo', '1'), 
(NULL, 'La plata', '1'), (NULL, 'Ezeiza', '1'), (NULL, 'Rio cuarto', '4'), 
(NULL, 'Córdoba', '4'), (NULL, 'Palermo', '2'), (NULL, 'Flores', '2'), 
(NULL, 'Santa Fé', '3'), (NULL, 'Rosario', '3');

UPDATE `eventos` SET `evento_discapacitados` = '1', `fecha_inicio` = '2024-10-14 22:16:54', `fecha_fin` = '2024-10-14 00:16:54', `fecha_registro` = '2024-10-25 22:16:54' WHERE `eventos`.`id_evento` = 2;
INSERT INTO `eventos`(`id_categoria_evento`, `nombre_evento`, `nombre_recinto`, `evento_mayores`, `evento_discapacitados`, `fecha_inicio`, `fecha_fin`, `provincia`, `ciudad`, `direccion`, `total_localidades`, `id_admin_evento`, `fecha_registro`) 
VALUES ('1','Taylor swift Argentina 2024','Estadio River Plate','0','1','2024-10-12 22:00:00','2024-10-12 23:45:00','Buenos Aires','Caba','Calle falsa 123','1000','3','2024-10-25 22:16:54'),
('1','Luis Miguel tour','Estadio River Plate','0','1','2024-11-12 22:00:00','2024-11-12 23:45:00','1','1','Calle falsa 123','1000','3','2024-10-25 22:16:54'),
('1','Kiss End of the World tour','Campo de polo','1','1','2023-10-10 22:00:00','2023-10-10 23:55:00','1','1','Jujuy 233','1000','3','2023-01-25 22:16:54');


INSERT INTO `imgs_eventos` ( `id_evento`, `nombre_img`, `url_img`, `extension`, `tamano`) VALUES ( '6', 'kiss.png', 'imgs/kiss.png', 'png', '1'),( '4', 'showimg.jpg', 'imgs/showimg.jpg', 'jpg', '2'),( '5', 'luismiguel.jpg', 'imgs/luismiguel.jpg', 'jpg', '1')
INSERT INTO `tipos_entradas`( `nombre_tipo`) VALUES ('General'),('anticipada'),('Campo vip'),('campo de pie'),('Platea'),('Pullman'),('Palco');
INSERT INTO `tipos_entradas_evento`(`id_tipo_entrada`, `id_evento`, `precio`, `cantidad_por_tipo`, `estan_numeradas`) VALUES ('1','4','30000','500','no'), ('2','4','50000','200','no'),
('2','4','25000','300','si'),('1','5','25000','1000','no'),('1','6','25000','600','no'),('3','6','45000','400','no')
--estas como estan numeradas hay insertar en la tabla entradas_numeradas
INSERT INTO `entradas_numeradas`( `numeracion_entrada`, `id_tipo_entrada`, `estado`) VALUES ('11','3','disponible'),
('10','3','disponible'),('9','3','vendida'),('18','3','disponible'),('17','3','disponible'),('6','3','vendida')


INSERT INTO `preguntas_frecuentes` (`id_pregunta`, `pregunta`, `contenido`, `estado`) VALUES (NULL, 'Medios de pago', 'Aceptamos todos los medios de pago', 'activa');