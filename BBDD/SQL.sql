DROP DATABASE  mis_entradas;
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
    numeracion_entrada INT NULL,
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

INSERT INTO provincias (nombre) 
VALUES 
('Buenos Aires'),
('CABA'),
('Córdoba'),
('Santa Fe');
INSERT INTO ciudades (nombre, id_provincia) 
VALUES 
('La Plata', 1),
('Quilmes', 1),
('Lomas de zamora', 1),
('Lanús', 1),
('San Isidro', 1),
('Ezeiza', 1),
('Merlo', 1),
('Avellaneda', 1),
('Flores', 2),
('Microcentro', 2),
('Palermo', 2),
('Liniers', 2),
('Nuñez', 2),
('Córdoba', 3),
('Carlos paz', 3),
('Rio Cuarto', 3),
('Santa fé', 4),
('Rosario', 4);





INSERT INTO categorias_eventos (nombre_categoria, estado) 
VALUES 
('Musical', 'activo'),
('Artistico', 'activo'),
('Deportivo', 'activo'),
('Tecnológico', 'activo');

INSERT INTO tipos_entradas( nombre_tipo) 
VALUES 
('General'),
('Anticipada'),
('Campo vip'),
('Campo de pie'),
('Platea'),
('Pullman'),
('Palco'),
('Platea alta'),
('Platea alta central'),
('Platea baja'),
('Campo sentado'),
('Campo parado'),
('Campo delantero'),
('Campo trasero'),
('Popular'),
('Preferencial'),
('campo'),
('Platea central'),
('popular');



INSERT INTO usuarios ( nombre_usuario, genero, email, telefono, contrasena, estado) VALUES 
('el cliente', NULL, 'cliente@email.com', NULL, '$2y$10$dgtNbiHiPrZNLG8uPStk8e10z2mD7a48Iyr3ZMd5ce.onCLagCC.K', 'activo'), 
('admin sistemas', NULL, 'sistemas@email.com', NULL, '$2y$10$dgtNbiHiPrZNLG8uPStk8e10z2mD7a48Iyr3ZMd5ce.onCLagCC.K', 'activo'), 
('admin eventos', NULL, 'eventos@email.com', NULL, '$2y$10$dgtNbiHiPrZNLG8uPStk8e10z2mD7a48Iyr3ZMd5ce.onCLagCC.K', 'activo');



INSERT INTO eventos(id_categoria_evento, nombre_evento, nombre_recinto, evento_mayores, evento_discapacitados, fecha_inicio, fecha_fin, id_provincia, id_ciudad, direccion, total_localidades, id_admin_evento, fecha_registro) 
VALUES 
('1','Taylor swift Argentina 2024','Estadio Unico de la Plata','0','1','2024-10-12 22:00:00','2024-10-12 23:45:00','1','1','Calle falsa 123','1000','3','2024-10-25 22:16:54'),
('1','Luis Miguel tour','Estadio River Plate','0','1','2024-11-12 22:00:00','2024-11-12 23:45:00','2','13','Calle falsa 123','1000','3','2024-10-25 22:16:54'),
('1','Kiss End of the World tour','Campo de polo','1','1','2023-10-10 22:00:00','2023-10-10 23:55:00','1','1','Jujuy 233','1000','3','2023-01-25 22:16:54'),
('1','Iron Maiden 2024','Estadio huracan','0','1','2024-12-01 21:00:00','2024-12-03 23:30:00','2','1','Jujuy 233','2400','3','2023-01-25 22:16:54'),
('1','Oasis 2025','Estadio River Plate','1','1','2025-11-15 22:00:00','2025-11-16 23:55:00','2','13','Jujuy 233','2400','3','2023-01-25 22:16:54'),
('1','Loola Palooza 2025','Hipódromo de San Isidro','1','1','2025-03-10 12:00:00','2025-03-10 23:55:00','1','5','Jujuy 233','1000','3','2023-01-25 22:16:54'),
('1','WASP Argentina 2025','Teatro Flores','1','1','2025-05-02 22:00:00','2025-05-02 23:00:00','2','9','Rivadavia 7500','1000','3','2023-01-25 22:16:54'),
('1','Venom Latin American Tour','Groove','1','1','2024-11-30 21:15:00','2023-11-30 23:30:00','2','11','Santa fé 3500','1000','3','2023-01-25 22:16:54'),
('1','Tungsteno en flores','Teatro Flores','1','1','2024-12-08 21:30:00','2024-12-08 23:00:00','2','9','Rivadavia 7500','1000','3','2023-01-25 22:16:54'),
('1','Obituary 2025','El teatrito','1','1','2025-02-19 21:00:00','2025-02-19 23:00:00','2','10','Sarmiento 1750','1000','3','2023-01-25 22:16:54'),
('1','Fonseca','Teatro Gran Rex','1','1','2024-12-10 22:00:00','2024-12-10 23:55:00','2','10','Corrientes 200','700','3','2023-01-25 22:16:54'),
('1','Leny Kravitz','Movistar Arena','1','1','2024-12-01 21:00:00','2024-12-01 23:55:00','2','1','Holmberg 200','4900','3','2023-01-25 22:16:54'),
('2','Lelzar gira mundial','Teatrito','1','1','2024-11-30 22:00:00','2024-11-30 23:55:00','4','1','Jujuy 233','10','3','2023-01-25 22:16:54'),
('2','Cha-Cha-Cha','Teatro metropolitan','1','0','2024-12-20 22:00:00','2024-12-20 23:55:00','2','10','Jujuy 233','10','3','2023-01-25 22:16:54'),
('2','Miguel y Chino','Un Teatro','1','0','2025-12-20 22:00:00','2025-12-20 23:55:00','4','18','Jujuy 233','10','3','2023-01-25 22:16:54');

INSERT INTO imgs_eventos ( id_evento, nombre_img, url_img)
 VALUES ( '1', 'flyer', 'imgs/showimg.jpg'),
 ( '2', 'flyer', 'imgs/luismiguel.jpg'),
 ( '3', 'flyer', 'imgs/kiss.png'),
 ( '4', 'flyer', 'imgs/ironmaiden.jpg'),
 ( '5', 'flyer', 'imgs/oasis-en-argentina-2025.jpg'),
 ( '6', 'flyer', 'imgs/loola2025flyer.png'),
 ( '7', 'flyer', 'imgs/wasp.jpg'),
( '8', 'flyer', 'imgs/venom-latin_america-2024.jpg'),
 ( '9', 'flyer', 'imgs/tungsteno.jpg'),
 ( '10', 'flyer', 'imgs/obituary.jpg'),
 ( '11', 'flyer', 'imgs/fonseca.jpg'),
 ( '12', 'flyer', 'imgs/lenykravitz.jpg'),
 ( '13', 'flyer', 'imgs/lelzar.jpg'),
 ( '14', 'flyer', 'imgs/cha-cha-cha.jpg'),
  ( '15', 'flyer', 'imgs/midachi.jpg'),
 ( '5', 'mapa', 'imgs/ubicaciones3.jpg'),
 ( '4', 'mapa', 'imgs/ironubica.jpg'),
  ( '12', 'mapa', 'imgs/lenyubicaciones.jpg');


INSERT INTO tipos_entradas_evento(id_tipo_entrada, id_evento, precio, cantidad_por_tipo, estan_numeradas) 
VALUES 
('2','1','30000','500','no'),
('1','1','50000','500','no'), 
('2','2','25000','500','no'),
('1','2','35000','500','no'),
('1','3','25000','500','no'),
('3','3','45000','500','no'),

('16','4','195000','400','no'),
('18','4','180000','400','no'),
('10','4','165000','400','no'),
('17','4','95000','400','no'),
('10','4','82000','400','no'),
('9','4','50000','400','no'),


('8','5','75000','400','no'),
('10','5','70000','400','no'),
('11','5','95000','400','no'),
('12','5','110000','400','no'),
('16','5','130000','400','no'),
('19','5','140000','400','no'),

('1','6','350000','1000','no'),

('1','7','60000','1000','no'),
('1','8','60000','1000','no'),
('1','9','10000','1000','no'),
('1','10','65000','1000','no'),
('1','11','65000','700','no'),

('8','12','70000','700','no'),
('14','12','75000','700','no'),
('8','12','95000','700','no'),
('10','12','110000','700','no'),
('10','12','130000','700','no'),
('13','12','140000','700','no'),
('10','12','150000','700','no'),



('1','13','6000','10','si'),
('1','14','8000','10','si'),
('1','15','8500','10','si');


INSERT INTO entradas_numeradas(id_tipo_entrada,numeracion_entrada,estado)
VALUES
(32,1,'disponible'),
(32,2,'disponible'),
(32,3,'disponible'),
(32,4,'disponible'),
(32,5,'disponible'),
(32,6,'disponible'),
(32,7,'disponible'),
(32,8,'disponible'),
(32,9,'disponible'),
(32,10,'disponible'),
(33,1,'disponible'),
(33,2,'disponible'),
(33,3,'disponible'),
(33,4,'disponible'),
(33,5,'disponible'),
(33,6,'disponible'),
(33,7,'disponible'),
(33,8,'disponible'),
(33,9,'disponible'),
(33,10,'disponible'),
(34,1,'disponible'),
(34,2,'disponible'),
(34,3,'disponible'),
(34,4,'disponible'),
(34,5,'disponible'),
(34,6,'disponible'),
(34,7,'disponible'),
(34,8,'disponible'),
(34,9,'disponible'),
(34,10,'disponible');









INSERT INTO `roles` ( `nombre`) 
VALUES ( 'cliente'), ( 'administrador de sistemas'), ( 'administrador de eventos');

INSERT INTO `permisos` (`nombre`) 
VALUES 
('comprar_entrada'), 
('añadir_tarjeta'), 
('calificar_evento'),
('ver_panel_admi_sistema'), 
('ver_administradores_eventos'), 
('ver_tipo_entradas'), 
('ver_preguntas_frecuentes'), 
('generar_reporte_de_ventas'), 
('crear_admi_eventos'), 
('eliminar_admi_eventos'), 
('administrar_categorias'),
('ver_panel_admi_eventos'), 
('administrar_evento'), 
('responder_consulta');

INSERT INTO roles_permisos ( id_rol, id_permiso) 
VALUES 
( '1', '1'), ( '1', '2'), ( '1', '3'), 
( '2', '4'), ( '2', '5'), ( '2', '6'), 
( '2', '7'), ( '2', '8'), ( '2', '9'),( '2', '10'), ( '2', '11'), 
( '3', '12'),
( '3', '13'),
( '3', '14');

INSERT INTO roles_usuarios (id_rol, id_usuario) VALUES ( '1', '1'), ( '2', '2'), ( '3', '3'); 

INSERT INTO preguntas_frecuentes (pregunta, contenido, estado) 
VALUES ('Nuestros servicios', 'Entregamos soluciones para empresas, comercios, eventos, festivales, 
fiestas, clubs, restaurants, consumo masivo, entre otros. 
Tenemos soporte remoto y en línea las 24 horas del día.       
Podrás comprar  de manera rápida, 
segura y eficiente. ¿El objetivo? Evitar las largas filas que hay en comercios, eventos, 
festivales y conciertos.  ', 'activa'),
('Métodos de pago',' En MisEntradas.com podes abonar con tarjetas de débido
y crédito de los principales bancos del mundo. 
 Además, podes abonar en efectivo y retirar tus entradas al momento de pagar.','activa'),
('Seguridad de la Plataforma','Nuestra plataforma opera bajo los últimos estándares 
de seguridad para vender entradas de tus eventos favoritos. ','activa'),
('Información personal','Nunca compartimos tus datos con nadie.            
Si usas nuestro servicio para efectuar compras  recopilamos información 
sobre dicha compra o transacción. 
Esto incluye información de pago, como el número de tu tarjeta de crédito o
 débito y otra información sobre la tarjeta; otra 
información sobre la cuenta y la autenticación; y detalles de facturación, 
envío y contacto
Usamos la información que tenemos para enviarte mensajes de marketing, 
comunicarnos contigo sobre nuestros Productos 
e informarte acerca de nuestras políticas y condiciones. 
También usamos tu información para responderte cuando te pones en contacto con nosotros.','activa'),
('¿Cómo cancelo mi cuenta?','Para cancelar tu cuenta tenés que iniciar una solicitud de cancelación, podrás cancelar tu cuenta de inmediato.
Una vez que confirmemos tu cancelación, podrás volver 
a crear una cuenta cuando quieras con el mismo e-mail que usas ahora.','activa'),
('¿Cómo cancelo una compra?','Para realizar una cancelación, dirigite al 
historial de compras en la pestaña "Mis compras" .
En el menú de la compra que ya no quieres recibir, 
elige la opción "Cancelar compra", recibirás el reembolso total de tu dinero. 
Después de la cancelación de la compra, 
el tiempo que tarda en acreditarse el reembolso depende del medio
 de pago donde recibas el dinero. 
Por lo general, hacemos los reembolsos al mismo medio de pago que usaste para comprar. 
Recuerda que sólo puedes cancelar la compra hasta 24 hs antes de que se realize el evento
del que hayas adquirido las entradas.','activa');