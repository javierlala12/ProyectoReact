-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 25-02-2024 a las 15:46:29
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nodejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registroMantenimiento`
--

CREATE TABLE `registroMantenimiento` (
  `idregistroMantenimiento` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `idvehiculo` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `registroMantenimiento`
--

INSERT INTO `registroMantenimiento` (`idregistroMantenimiento`, `nombre`, `descripcion`, `precio`, `idvehiculo`) VALUES
(1, 'ACEITE', 'CAMBIO DE ACEITE', 10.00, 1),
(2, 'Cambio de motor', 'cambio de motor por fallo mecanico', 10.00, 1),
(3, 'Cambio de aceite', 'Cambio de aceite sintético', 60.00, 1),
(4, 'Revisión de frenos', 'Cambio de pastillas de freno', 120.00, 2),
(5, 'Cambio de llantas', 'Llantas nuevas para mejor tracción', 400.00, 3),
(6, 'Alineación y balanceo', 'Servicio de alineación y balanceo de llantas', 80.00, 4),
(7, 'Servicio eléctrico', 'Revisión y reparación del sistema eléctrico', 150.00, 5),
(8, 'Mantenimiento del A/C', 'Recarga de refrigerante y revisión del A/C', 100.00, 6),
(9, 'Cambio de correa de distribución', 'Reemplazo de la correa de distribución y revisión', 500.00, 7),
(10, 'Inspección general', 'Inspección de 100 puntos', 200.00, 8),
(11, 'Reparación de suspensión', 'Cambio de amortiguadores y revisión de suspensión', 300.00, 9),
(12, 'Lavado y detallado', 'Servicio completo de lavado y detallado interior', 100.00, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `idvehiculo` int NOT NULL,
  `vehiculo` varchar(255) DEFAULT NULL,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`idvehiculo`, `vehiculo`, `descripcion`) VALUES
(1, 'Toyota Corolla', 'Descripción del Toyota Corolla'),
(2, 'Honda Civic', 'Sedán confiable y económico'),
(3, 'Ford F-150', 'Camioneta potente y duradera'),
(4, 'Chevrolet Camaro', 'Deportivo icónico con alto rendimiento'),
(5, 'Tesla Model S', 'Vehículo eléctrico innovador con autonomía líder'),
(6, 'BMW Serie 3', 'Sedán de lujo con manejo superior'),
(7, 'Audi A4', 'Combinación de lujo y tecnología'),
(8, 'Mazda CX-5', 'SUV versátil con buen manejo'),
(9, 'Subaru Outback', 'Ideal para aventuras con tracción total'),
(10, 'Volkswagen Golf', 'Compacto, eficiente y divertido de manejar');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registroMantenimiento`
--
ALTER TABLE `registroMantenimiento`
  ADD PRIMARY KEY (`idregistroMantenimiento`),
  ADD KEY `idvehiculo` (`idvehiculo`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`idvehiculo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registroMantenimiento`
--
ALTER TABLE `registroMantenimiento`
  MODIFY `idregistroMantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `idvehiculo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registroMantenimiento`
--
ALTER TABLE `registroMantenimiento`
  ADD CONSTRAINT `registroMantenimiento_ibfk_1` FOREIGN KEY (`idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
