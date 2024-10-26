--PARA CREAR LA BBDD
CREATE DATABASE mis_entradas;

CREATE TABLE usuarios(
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    apellido_usuario VARCHAR(100),
    genero VARCHAR(20),
    email VARCHAR(150),
    telefono VARCHAR(12),
    contrasena VARCHAR(25)
)
CREATE TABLE permisos (
  id int(11) NOT NULL,
  nombre varchar(255) NOT NULL,
  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
) 

CREATE TABLE roles(
    id_rol INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_rol VARCHAR(70) -- usuario, admin eventos, admin sistemas, etc
)

CREATE TABLE roles_permisos(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  id_rol int(11) NOT NULL,
  id_permiso int(11) NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (id_permiso) REFERENCES permisos(id)
)

CREATE TABLE `roles_usuarios` (
  id int(11) NOT NULL,
  id_rol int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) 






CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_categoria_evento INT NOT NULL, --Clave foranea 
    nombre_evento VARCHAR(255) NOT NULL,  -- Nombre del evento
    nombre_recinto VARCHAR(255) NOT NULL,  -- Nombre del recinto donde se realiza el evento
    mapa_ubicaciones VARCHAR(255), --una imagen que muestra las ubicaciones del recinto
    evento_mayores TINYINT NOT NULL DEFAULT 0,  -- 0 = No, 1 = Sí
    evento_discapacitados TINYINT NOT NULL DEFAULT 0,  -- 0 = No, 1 = Sí
    fecha_inicio DATETIME NOT NULL,  -- Fecha y hora de inicio del evento
    fecha_fin DATETIME NOT NULL,  -- Fecha y hora de finalización del evento
    provincia VARCHAR(100) NOT NULL,  -- Provincia donde se realiza el evento
    ciudad VARCHAR(100) NOT NULL,  -- Ciudad donde se realiza el evento
    direccion VARCHAR(255),  -- Dirección del evento
    total_localidades INT NOT NULL,  -- Total de localidades disponibles
    id_admin_evento INT NOT NULL,  -- Clave foránea que referencia a la tabla de administradores de eventos
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de registro del evento
    FOREIGN KEY (id_admin_evento) REFERENCES admin_eventos(id_admin_evento)  -- Relación con la tabla de administradores de eventos
    FOREIGN KEY (id_categoria_evento) REFERENCES categorias_eventos(id_categoria)  -- Relación con la tabla de categorias

);
--DAtos de las imgs del evento
CREATE TABLE imgs_eventos(
    id_img INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_evento INT NOT NULL,
    nombre_img VARCHAR(255),
    url_img VARCHAR(255),
    extension VARCHAR(25),
    tamano INT(11),
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)  -- Relación con la tabla de eventos

)

CREATE TABLE tipos_entradas(
    id_tipo INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_tipo VARCHAR(100),
)


--entradas del evento
CREATE TABLE tipos_entradas_evento (
    id_tipo_entrada INT PRIMARY KEY, --clave primaria y foranea
    id_evento INT NOT NULL,  -- Clave foránea que referencia a la tabla de eventos
    precio DECIMAL(10, 2) NOT NULL,  -- Precio de la entrada
    cantidad_por_tipo INT NOT NULL,  -- Cantidad de entradas por tipo
    estan_numeradas VARCHAR(2),-- Estan numeradas si/no
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)  -- Relación con la tabla de eventos
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas(id_tipo)  -- Relación con la tabla con los tipos de entradas


);

CREATE TABLE entradas_numeradas(
    id_entrada INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    numeracion_entrada INT NOT NULL,
    id_tipo_entrada INT NOT NULL,
    estado ENUM('disponible', 'vendida') NOT NULL,
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_entrada)  -- Relación con la tabla con los tipos de entradas

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
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra)
    FOREIGN KEY (id_tipo_entrada) REFERENCES tipos_entradas_evento(id_tipo_entrada)
)



-- Crear tabla preguntas_frecuentes

CREATE TABLE preguntas_frecuentes (

    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,--ID del evento por el cual se consulta
    nombre_completo VARCHAR(255),
    email VARCHAR(255),
    pregunta TEXT NOT NULL,
    contenido TEXT NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)  -- Relación con la tabla de eventos


);

CREATE TABLE consultas_usuarios(
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    contenido_consulta TEXT NOT NULL,
    nombre_usuario VARCHAR(250),
    email_usuario VARCHAR(150),
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de la consulta
    id_evento NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)

)

CREATE TABLE calificacion_evento(
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    id_usuario INT NOT NULL
    calificacion INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)  -- Relación con la tabla de usuarios
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

    codigo_seguridad VARCHAR(3) NOT NULL,  -- Código de seguridad

    tipo_tarjeta ENUM('Crédito', 'Débito') NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)  -- Relación con la tabla de usuarios

);

CREATE TABLE categorias_eventos(
    id_categoria INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_categoria VARCHAR(50),
)

