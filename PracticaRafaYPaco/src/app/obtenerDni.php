<?php

$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
$conex = new PDO('mysql:host=localhost;dbname=bibliotecagnommo', 'root', '', $opciones);

$consulta = $conex->prepare('SELECT id FROM author WHERE id=? ORDER BY RAND() LIMIT 1');
$consulta->bindParam(1,$_GET['id']);
$palabra = $consulta->fetchAll();
echo json_encode($palabra);


?>