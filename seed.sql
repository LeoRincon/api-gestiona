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
    id_temporada UUID NOT NULL,
    FOREIGN KEY (id_temporada) REFERENCES gestiona.temporada (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
    gasto_insumo_id UUID NOT NULL,
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


-- Inserts para la tabla `proyecto`
INSERT INTO gestiona.proyecto (nombre, descripcion) VALUES ('Proyecto AgroTech', 'Proyecto de agricultura sostenible.');

-- Inserts para la tabla `unidad_medida`
INSERT INTO gestiona.unidad_medida (nombre, unidad, descripcion) VALUES ('Kilogramos', 'kg', 'Unidad de medida para peso.');

-- Inserts para la tabla `cultivo`
INSERT INTO gestiona.cultivo (nombre, tipo_siembra, fecha_inicio, area_terreno, proyecto_id, id_unidad_medida)
VALUES ('Maíz', 'Siembra directa', '2024-01-15', 10.5, (SELECT id FROM gestiona.proyecto LIMIT 1), (SELECT id FROM gestiona.unidad_medida LIMIT 1));

-- Inserts para la tabla `usuario`
INSERT INTO gestiona.usuario (nombre, email, password_hash) VALUES ('Juan Pérez', 'juan@example.com', 'hashedpassword123');

-- Inserts para la tabla `novedades`
INSERT INTO gestiona.novedades (nombre, descripcion) VALUES ('Plaga detectada', 'Se detectó una plaga en el cultivo de maíz.');

-- Inserts para la tabla `temporada`
INSERT INTO gestiona.temporada (nombre, duracion, fecha_inicio, fecha_fin, id_cultivo, novedades_id)
VALUES ('Temporada Primavera', 90, '2024-03-01', '2024-06-01', (SELECT id FROM gestiona.cultivo LIMIT 1), (SELECT id FROM gestiona.novedades LIMIT 1));

-- Inserts para la tabla `categoria`
INSERT INTO gestiona.categoria (nombre, descripcion) VALUES ('Fertilizantes', 'Productos para mejorar la calidad del suelo.');

-- Inserts para la tabla `actividad`
INSERT INTO gestiona.actividad (nombre, descripcion, id_categoria, id_temporada)
VALUES ('Fertilización de suelo', 'Aplicación de fertilizantes orgánicos.', (SELECT id FROM gestiona.categoria LIMIT 1), (SELECT id FROM gestiona.temporada LIMIT 1));

-- Inserts para la tabla `inventario`
INSERT INTO gestiona.inventario (id_proyecto) VALUES ((SELECT id FROM gestiona.proyecto LIMIT 1));

-- Inserts para la tabla `insumo`
INSERT INTO gestiona.insumo (nombre, cantidad_disponible, fecha_ingreso, precio, id_inventario, id_categoria, id_unidad_medida)
VALUES ('Fertilizante Orgánico', 50, '2024-01-10', 200.0, (SELECT id FROM gestiona.inventario LIMIT 1), (SELECT id FROM gestiona.categoria LIMIT 1), (SELECT id FROM gestiona.unidad_medida LIMIT 1));

-- Inserts para la tabla `gasto`
INSERT INTO gestiona.gasto (id_temporada, id_insumo, cantidad_usada, precio_total, id_unidad_medida)
VALUES ((SELECT id FROM gestiona.temporada LIMIT 1), (SELECT id FROM gestiona.insumo LIMIT 1), 10, 40.0, (SELECT id FROM gestiona.unidad_medida LIMIT 1));

-- Inserts para la tabla `gestion_actividades`
INSERT INTO gestiona.gestion_actividades (id_actividad, id_temporada, costo, gasto_insumo_id)
VALUES ((SELECT id FROM gestiona.actividad LIMIT 1), (SELECT id FROM gestiona.temporada LIMIT 1), 500.0, (SELECT id FROM gestiona.gasto LIMIT 1));

-- Inserts para la tabla `rol`
INSERT INTO gestiona.rol (nombre, descripcion) VALUES ('Administrador', 'Gestiona el sistema y los proyectos.');

-- Inserts para la tabla `usuario_has`
INSERT INTO gestiona.usuario_has (usuario_id, proyecto_id, id_rol)
VALUES ((SELECT id FROM gestiona.usuario LIMIT 1), (SELECT id FROM gestiona.proyecto LIMIT 1), (SELECT id FROM gestiona.rol LIMIT 1));

-- Inserts para la tabla `producto`
INSERT INTO gestiona.producto (nombre, cantidad_recolectada, fecha_recoleccion, id_temporada, id_unidad_medida)
VALUES ('Maíz amarillo', 1500, '2024-06-15', (SELECT id FROM gestiona.temporada LIMIT 1), (SELECT id FROM gestiona.unidad_medida LIMIT 1));

-- Inserts para la tabla `venta`
INSERT INTO gestiona.venta (cantidad_vendida, precio_total, fecha_venta, id_temporada, observaciones, id_unidad_medida, precio_unitario)
VALUES (500, 2500.0, '2024-07-01', (SELECT id FROM gestiona.temporada LIMIT 1), 'Venta mayorista.', (SELECT id FROM gestiona.unidad_medida LIMIT 1), 5.0);
