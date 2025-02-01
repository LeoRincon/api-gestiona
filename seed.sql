-- Habilitar la extensión de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creamos el esquema `gestiona`
CREATE SCHEMA IF NOT EXISTS gestiona;
-- -----------------------------------------------------
-- Table `gestiona`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.proyecto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table `gestiona`.`unidad_medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.unidad_medida (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    unidad VARCHAR(20) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table `gestiona`.`cultivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.cultivo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    tipo_siembra VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    area_terreno FLOAT NOT NULL,
    proyecto_id UUID NOT NULL,
    id_unidad_medida UUID NOT NULL,
    FOREIGN KEY (proyecto_id) REFERENCES gestiona.proyecto (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_unidad_medida) REFERENCES gestiona.unidad_medida (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `gestiona`.`novedades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.novedades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL
);

-- -----------------------------------------------------
-- Table `gestiona`.`temporada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.temporada (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    duracion INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    id_cultivo UUID NOT NULL,
    novedades_id UUID,
    FOREIGN KEY (id_cultivo) REFERENCES gestiona.cultivo (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (novedades_id) REFERENCES gestiona.novedades (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.categoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table `gestiona`.`actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.actividad (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    id_categoria UUID NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES gestiona.categoria (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.inventario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_proyecto UUID NOT NULL,
    FOREIGN KEY (id_proyecto) REFERENCES gestiona.proyecto (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`insumo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.insumo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    cantidad_disponible FLOAT NOT NULL,
    fecha_ingreso DATE NOT NULL,
    precio DOUBLE PRECISION NOT NULL,
    id_inventario UUID NOT NULL,
    id_categoria UUID NOT NULL,
    id_unidad_medida UUID NOT NULL,
    FOREIGN KEY (id_inventario) REFERENCES gestiona.inventario (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_categoria) REFERENCES gestiona.categoria (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_unidad_medida) REFERENCES gestiona.unidad_medida (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`gasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.gasto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_temporada UUID NOT NULL,
    id_insumo UUID NOT NULL,
    cantidad_usada FLOAT NOT NULL,
    precio_total DOUBLE PRECISION NOT NULL,
    id_unidad_medida UUID NOT NULL,
    FOREIGN KEY (id_temporada) REFERENCES gestiona.temporada (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_insumo) REFERENCES gestiona.insumo (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_unidad_medida) REFERENCES gestiona.unidad_medida (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`gestion_actividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.gestion_actividades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_actividad UUID NOT NULL,
    id_temporada UUID NOT NULL,
    costo DOUBLE PRECISION NOT NULL,
    fecha DATE NOT NULL DEFAULT NOW(),
    gasto_insumo_id UUID,
    FOREIGN KEY (id_actividad) REFERENCES gestiona.actividad (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_temporada) REFERENCES gestiona.temporada (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (gasto_insumo_id) REFERENCES gestiona.gasto (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.rol (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table `gestiona`.`usuario_has`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.usuario_has (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL,
    proyecto_id UUID NOT NULL,
    id_rol UUID NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES gestiona.usuario (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (proyecto_id) REFERENCES gestiona.proyecto (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_rol) REFERENCES gestiona.rol (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.producto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    cantidad_recolectada FLOAT NOT NULL,
    fecha_recoleccion DATE NOT NULL,
    id_temporada UUID NOT NULL,
    id_unidad_medida UUID NOT NULL,
    FOREIGN KEY (id_temporada) REFERENCES gestiona.temporada (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_unidad_medida) REFERENCES gestiona.unidad_medida (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `gestiona`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gestiona.venta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cantidad_vendida FLOAT NOT NULL,
    precio_total FLOAT NOT NULL,
    fecha_venta DATE NOT NULL,
    id_temporada UUID NOT NULL,
    observaciones TEXT,
    id_unidad_medida UUID NOT NULL,
    precio_unitario FLOAT NOT NULL,
    FOREIGN KEY (id_temporada) REFERENCES gestiona.temporada (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (id_unidad_medida) REFERENCES gestiona.unidad_medida (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);


-- INSERT TO DATA BASE GESTIONA


-- Inserciones para gestiona.proyecto
INSERT INTO gestiona.proyecto (id, nombre, descripcion) 
VALUES ('d1c3d2b7-5555-48fa-b6a1-abc123def456', 'Proyecto Sabana', 'descripcion del proyecto'),
('a698c1c7-3d66-46f1-900a-3dcc5358bf7a', 'Proyecto Bosque', 'descripcion del proyecto');

-- Inserciones para gestiona.unidad_medida
INSERT INTO gestiona.unidad_medida (id, nombre, unidad, descripcion) 
VALUES 
('f1234567-8abc-1234-5678-defabc456789', 'Metro cuadrado', 'm2', 'Unidad de medida para terrenos'),
('a8457b6c-e398-4dea-b32e-de0fcefa5cc3', 'hectárea', 'ha', 'Unidad de medida de área que equivale a 10.000 m2'),
('e2345678-9def-1234-5678-abc456789012', 'Centímetro Cúbico', 'cm3', 'Unidad de medida para liquidos');

-- Inserciones para gestiona.cultivo
INSERT INTO gestiona.cultivo (id, nombre, tipo_siembra, fecha_inicio, area_terreno, proyecto_id, id_unidad_medida) 
VALUES 
('c1234567-9abc-1234-5678-abc456789def', 'Cultivo de Maíz', 'Maiz', '2024-01-01', 1500, 'd1c3d2b7-5555-48fa-b6a1-abc123def456', 'f1234567-8abc-1234-5678-defabc456789');

INSERT INTO gestiona.cultivo (id, nombre, tipo_siembra, fecha_inicio, area_terreno, proyecto_id, id_unidad_medida)
VALUES ('328ef414-c70e-4266-a92b-7137219302eb','Cafetal 1', 'Café', '2022-05-21', 1200, 'd1c3d2b7-5555-48fa-b6a1-abc123def456', 'f1234567-8abc-1234-5678-defabc456789');

-- Inserciones para gestiona.usuario
INSERT INTO gestiona.usuario (id, nombre, email, password_hash, fecha_registro) 
VALUES 
('a1234567-8def-1234-5678-abc123def456', 'Juan Pérez', 'juan.perez@example.com', 'hashed_password_example', '2024-11-18 10:00:00'),
('418b748c-e511-46b2-8f6c-6e9551093cf5', 'John Doe', 'john.doe@email.com', '2b$10$joo8ZQyEoH77CD1RyidIE.kN8tPDrbZAQyAyvcUzfpiZA519SvKWm', '2024-12-31 18:52:03.426777');

-- Inserciones para gestiona.novedades
INSERT INTO gestiona.novedades (id, fecha, nombre, descripcion) 
VALUES 
('b1234567-8abc-1234-5678-abc456789def', '2024-11-18 10:00:00', 'Gasto adicional', 'El cultivo tuvo problemas y se agrego más semillas.');

-- Inserciones para gestiona.temporada
INSERT INTO gestiona.temporada (id, nombre, duracion, fecha_inicio, fecha_fin, id_cultivo, novedades_id) 
VALUES 
('d2345678-8def-1234-5678-abc456789abc', 'Temporada Maíz 2024', 120, '2024-01-01', '2024-05-01', 'c1234567-9abc-1234-5678-abc456789def', 'b1234567-8abc-1234-5678-abc456789def');

INSERT INTO gestiona.temporada (id, nombre, duracion, fecha_inicio, fecha_fin, id_cultivo)
VALUES (uuid_generate_v4(), 'Primera Temporada', 225, '2022-05-21', '2022-12-31', '328ef414-c70e-4266-a92b-7137219302eb'),
		(uuid_generate_v4(), 'Segunda Temporada', 365, '2023-01-01', '2023-12-31', '328ef414-c70e-4266-a92b-7137219302eb'),
		(uuid_generate_v4(), 'Tercera Temporada', 365, '2024-01-01', '2024-12-31', '328ef414-c70e-4266-a92b-7137219302eb');

-- Inserciones para gestiona.categoria
INSERT INTO gestiona.categoria (id, nombre, descripcion) 
VALUES 
('e3456789-8abc-1234-5678-abc456789def', 'Semillas', 'Material vegetal para siembra'),
('5ab50abe-d60e-4e74-9b58-f8655b498bcb', 'Recolección', 'Acciones referentes con la recolección de productos' ),
('c743de70-fc8d-4ea8-8037-db726c5b5ed1', 'Mantenimiento', 'Acciones referentes a mantener el cultivo'),
('f3d817e7-5585-4d26-93c5-f05f88b46c8d', 'Siembra', 'Acciones referentes a la siembra de cultivos');

-- Inserciones para gestiona.actividad
INSERT INTO gestiona.actividad (nombre, descripcion, id_categoria) 
VALUES 
('Preparación del Terreno', 'Labores iniciales para la siembra', 'e3456789-8abc-1234-5678-abc456789def'),
('Germinar semillas','Desarrollar plantulas mediante semillas','f3d817e7-5585-4d26-93c5-f05f88b46c8d'),
('Fumigar','Aplicar productos mediante asperción','c743de70-fc8d-4ea8-8037-db726c5b5ed1'),
('Desherbar','Remover malas hierbas','c743de70-fc8d-4ea8-8037-db726c5b5ed1');

-- Inserciones para gestiona.inventario
INSERT INTO gestiona.inventario (id, id_proyecto) 
VALUES 
('a5678901-8abc-1234-5678-abc456789abc', 'd1c3d2b7-5555-48fa-b6a1-abc123def456');

-- Inserciones para gestiona.insumo
INSERT INTO gestiona.insumo (id, nombre, cantidad_disponible, fecha_ingreso, precio, id_inventario, id_categoria, id_unidad_medida) 
VALUES 
('b6789012-8def-1234-5678-abc456789abc', 'Semillas de Maíz', 200, '2024-01-01', 50, 'a5678901-8abc-1234-5678-abc456789abc', 'e3456789-8abc-1234-5678-abc456789def', 'e2345678-9def-1234-5678-abc456789012');

-- Inserciones para gestiona.gasto
INSERT INTO gestiona.gasto (id, id_temporada, id_insumo, cantidad_usada, precio_total, id_unidad_medida) 
VALUES 
('c7890123-8abc-1234-5678-abc456789abc', 'd2345678-8def-1234-5678-abc456789abc', 'b6789012-8def-1234-5678-abc456789abc', 20, 1000, 'e2345678-9def-1234-5678-abc456789012');

-- Inserciones para gestiona.gestion_actividades
INSERT INTO gestiona.gestion_actividades (id, id_actividad, id_temporada, costo, gasto_insumo_id, fecha) 
VALUES 
('d8901234-8def-1234-5678-abc456789abc', 'f4567890-8def-1234-5678-abc456789abc', 'd2345678-8def-1234-5678-abc456789abc', 200.0, 'c7890123-8abc-1234-5678-abc456789abc', '2025-01-01');

-- Inserciones para gestiona.rol
INSERT INTO gestiona.rol (id, nombre, descripcion) 
VALUES 
('e9012345-8abc-1234-5678-abc456789abc', 'Administrador', 'Gestiona el proyecto'), ('e0ed538f-0c33-4cbe-835c-fb2366f3f01d','Delegado', 'Gestiona el proyecto con acceso limitado');

-- Inserciones para gestiona.usuario_has
INSERT INTO gestiona.usuario_has (id, usuario_id, proyecto_id, id_rol) 
VALUES 
('f0123456-8def-1234-5678-abc456789abc', 'a1234567-8def-1234-5678-abc123def456', 'd1c3d2b7-5555-48fa-b6a1-abc123def456', 'e9012345-8abc-1234-5678-abc456789abc'),
('155280f4-7ae0-4bc8-b9da-ef4327929a5f', '418b748c-e511-46b2-8f6c-6e9551093cf5','a698c1c7-3d66-46f1-900a-3dcc5358bf7a', 'e9012345-8abc-1234-5678-abc456789abc' );

-- Inserciones para gestiona.producto
INSERT INTO gestiona.producto (id, nombre, cantidad_recolectada, fecha_recoleccion, id_temporada, id_unidad_medida) 
VALUES 
('a1234567-8abc-1234-5678-abc456789def', 'productName', 500.0, '2024-05-01', 'd2345678-8def-1234-5678-abc456789abc', 'e2345678-9def-1234-5678-abc456789012');

-- Inserciones para gestiona.venta
INSERT INTO gestiona.venta (id, cantidad_vendida, precio_total, fecha_venta, id_temporada, observaciones, id_unidad_medida, precio_unitario) 
VALUES 
('b2345678-8def-1234-5678-abc456789abc', 400.0, 2000.0, '2024-06-01', 'd2345678-8def-1234-5678-abc456789abc', 'Venta exitosa', 'e2345678-9def-1234-5678-abc456789012', 100);
